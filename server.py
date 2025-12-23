#!/usr/bin/env python3
import http.server
import socketserver
import os
import json
import re

PORT = 3000

# 确保assets/images目录存在
IMAGE_DIR = 'assets/images'
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR, exist_ok=True)

class ImageUploadHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/upload':
            print("\n=== 接收到上传请求 ===")
            
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                content_type = self.headers.get('Content-Type', '')
                
                print(f"Content-Type: {content_type}")
                print(f"Content-Length: {content_length}")
                
                if content_length == 0:
                    self.send_error_response(400, "Empty request body")
                    return
                
                # 读取请求体
                body = self.rfile.read(content_length)
                print(f"实际读取请求体大小: {len(body)} 字节")
                
                file_name = None
                file_data = None
                
                # 处理multipart/form-data请求
                if 'multipart/form-data' in content_type:
                    # 提取boundary
                    boundary_match = re.search(r'boundary=(.*)', content_type)
                    if not boundary_match:
                        self.send_error_response(400, "No boundary found in Content-Type")
                        return
                    
                    boundary = boundary_match.group(1)
                    print(f"Boundary: {boundary}")
                    
                    # 构建完整的boundary分隔符
                    boundary_bytes = f"--{boundary}".encode('utf-8')
                    
                    # 分割请求体为多个部分
                    parts = body.split(boundary_bytes)
                    print(f"分割出 {len(parts)} 个部分")
                    
                    # 遍历每个部分
                    for part in parts:
                        if not part or part == b'--\r\n':
                            continue
                            
                        # 查找头部和数据的分隔符
                        header_end = part.find(b'\r\n\r\n')
                        if header_end == -1:
                            continue
                            
                        # 分离头部和数据
                        headers = part[:header_end].decode('utf-8')
                        data = part[header_end + 4:]
                        
                        print(f"\n部分头部:\n{headers}")
                        print(f"部分数据大小: {len(data)} 字节")
                        
                        # 检查是否是fileName字段
                        if 'name="fileName"' in headers:
                            # 移除末尾的\r\n或\r\n--
                            file_name = data.rstrip(b'\r\n--').decode('utf-8')
                            print(f"提取到fileName: {file_name}")
                        
                        # 检查是否是image文件字段
                        elif 'name="image"' in headers and 'filename="' in headers:
                            # 提取原始文件名
                            filename_match = re.search(r'filename="(.*?)"', headers)
                            if filename_match:
                                original_filename = filename_match.group(1)
                                print(f"提取到原始文件名: {original_filename}")
                                
                                # 如果没有提供fileName，使用原始文件名
                                if not file_name:
                                    file_name = original_filename
                                    print(f"使用原始文件名: {file_name}")
                                
                                # 移除末尾的\r\n或\r\n--
                                file_data = data.rstrip(b'\r\n--')
                                print(f"提取到文件数据，大小: {len(file_data)} 字节")
                
                # 检查是否获取到必要信息
                if not file_data:
                    self.send_error_response(400, "No file data found in request")
                    return
                    
                if not file_name:
                    file_name = 'uploaded_image.jpg'
                    print(f"未提供文件名，使用默认值: {file_name}")
                
                # 保存文件
                file_path = os.path.join(IMAGE_DIR, file_name)
                print(f"\n保存文件到: {file_path}")
                
                try:
                    with open(file_path, 'wb') as f:
                        f.write(file_data)
                    print(f"文件保存成功，大小: {os.path.getsize(file_path)} 字节")
                    
                    # 发送成功响应
                    self.send_success_response(file_name)
                    return
                except Exception as e:
                    print(f"保存文件失败: {str(e)}")
                    self.send_error_response(500, f"Failed to save file: {str(e)}")
                    return
                    
            except Exception as e:
                print(f"处理请求时发生异常: {str(e)}")
                import traceback
                traceback.print_exc()
                self.send_error_response(400, f"Error processing request: {str(e)}")
                return
        else:
            # 其他POST请求返回404
            self.send_error_response(404, "File not found")
            return
    
    def send_success_response(self, file_name):
        """发送成功响应"""
        response_data = {
            "success": True,
            "message": "Image uploaded successfully",
            "fileName": file_name,
            "filePath": f"/assets/images/{file_name}"
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
    
    def send_error_response(self, status_code, message):
        """发送错误响应"""
        response_data = {
            "success": False,
            "message": message
        }
        
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

# 启动服务器
with socketserver.TCPServer(("", PORT), ImageUploadHandler) as httpd:
    print(f"\n=== 服务器启动 ===")
    print(f"Server started at http://localhost:{PORT}")
    print(f"Image upload endpoint: http://localhost:{PORT}/upload")
    print(f"Static files served from: {os.getcwd()}")
    print("==================")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

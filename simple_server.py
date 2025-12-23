#!/usr/bin/env python3
import http.server
import socketserver
import os
import json
from urllib.parse import urlparse, parse_qs

PORT = 8080

# 确保assets/images目录存在
IMAGE_DIR = 'assets/images'
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR, exist_ok=True)

class SimpleHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # 静态文件服务
        super().do_GET()
    
    def do_POST(self):
        if '/upload' in self.path:
            content_length = int(self.headers['Content-Length'])
            
            try:
                # 解析URL查询参数
                parsed_url = urlparse(self.path)
                query_params = parse_qs(parsed_url.query)
                
                # 从查询参数获取文件名
                filename = query_params.get('filename', ['default.jpg'])[0]
                
                # 读取请求体
                body = self.rfile.read(content_length)
                
                # 保存文件
                file_path = os.path.join(IMAGE_DIR, filename)
                with open(file_path, 'wb') as f:
                    f.write(body)
                
                # 发送成功响应
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                response = {
                    "success": True,
                    "message": "Image uploaded successfully",
                    "fileName": filename,
                    "filePath": f"/{IMAGE_DIR}/{filename}"
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except Exception as e:
                # 发送错误响应
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                response = {
                    "success": False,
                    "message": str(e)
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            # 其他POST请求返回404
            self.send_error(404, "File not found")

# 启动服务器
print(f"Starting server on http://localhost:{PORT}")
print(f"Image upload endpoint: http://localhost:{PORT}/upload")
print(f"Static files served from: {os.getcwd()}")

try:
    with socketserver.TCPServer(('', PORT), SimpleHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped by user.")
except Exception as e:
    print(f"Error starting server: {e}")
    import traceback
    traceback.print_exc()

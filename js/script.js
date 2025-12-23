// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    smoothScroll();
    
    // 收藏按钮交互
    heartIconToggle();
    
    // 产品过滤功能
    productFiltering();
    
    // 模型过滤功能
    modelFiltering();
    
    // 图片画廊效果
    imageGallery();
    
    // 关卡过滤和排序功能
    levelFiltering();
    
    // 关卡图片下拉显示功能
    levelImageToggle();
});

// 平滑滚动功能
function smoothScroll() {
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// 收藏按钮交互
function heartIconToggle() {
    const heartIcons = document.querySelectorAll('.heart-icon');
    
    heartIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.style.color = '#dc3545';
                this.style.transform = 'scale(1.2)';
            } else {
                this.style.color = '#333';
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// 产品过滤功能
function productFiltering() {
    const applyButton = document.querySelector('.filter-actions .btn-primary');
    const clearButton = document.querySelector('.filter-actions .btn-secondary');
    
    // 应用过滤
    applyButton.addEventListener('click', function() {
        // 获取选中的过滤条件
        const selectedCategory = document.querySelector('input[name="category"]:checked').nextElementSibling.textContent;
        const selectedColor = document.querySelector('.filter-select').value;
        
        console.log('应用过滤条件:', {
            category: selectedCategory,
            color: selectedColor
        });
        
        // 这里可以添加实际的过滤逻辑
        // 例如：显示/隐藏产品卡片
    });
    
    // 清除所有过滤
    clearButton.addEventListener('click', function() {
        // 重置所有过滤条件
        document.querySelector('input[name="category"]:checked').checked = false;
        document.querySelector('input[name="category"]').checked = true;
        document.querySelector('.filter-select').value = 'View all colors';
        
        console.log('清除所有过滤条件');
        
        // 这里可以添加重置产品显示的逻辑
    });
}

// 模型过滤功能
function modelFiltering() {
    // 获取模型筛选栏的按钮和控件
    const modelApplyButton = document.querySelector('#model .filter-actions .btn-primary');
    const modelClearButton = document.querySelector('#model .filter-actions .btn-secondary');
    
    // 应用过滤
    modelApplyButton.addEventListener('click', function() {
        // 获取选中的过滤条件
        const selectedCategory = document.querySelector('input[name="model-category"]:checked').nextElementSibling.textContent;
        const selectedColor = document.querySelector('#model .filter-select').value;
        
        console.log('应用模型过滤条件:', {
            category: selectedCategory,
            color: selectedColor
        });
        
        // 获取所有模型卡片
        const modelCards = document.querySelectorAll('.model-card');
        
        // 应用过滤逻辑
        let visibleCount = 0;
        
        modelCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardColor = card.getAttribute('data-color');
            
            let showCard = true;
            
            // 分类过滤 - 只要包含选中的类别名称就匹配
            if (selectedCategory !== 'All') {
                // 将分类名转换为小写进行比较，实现不区分大小写的匹配
                const lowercaseCategory = selectedCategory.toLowerCase();
                const lowercaseCardCategory = cardCategory.toLowerCase();
                
                // 检查卡片分类是否包含选中的类别名称
                if (!lowercaseCardCategory.includes(lowercaseCategory)) {
                    showCard = false;
                }
            }
            
            // 颜色过滤 - 只要卡片颜色列表中包含选中的颜色就匹配
            if (selectedColor !== 'View all colors') {
                // 将卡片颜色字符串转换为颜色数组
                const cardColors = cardColor.split(' ');
                
                // 检查卡片颜色数组是否包含选中的颜色
                if (!cardColors.includes(selectedColor)) {
                    showCard = false;
                }
            }
            
            // 显示或隐藏卡片
            if (showCard) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // 更新结果数量
        const resultCount = document.querySelector('#model .filters p');
        resultCount.textContent = `${visibleCount} Results`;
    });
    
    // 清除所有过滤
    modelClearButton.addEventListener('click', function() {
        // 重置所有过滤条件
        document.querySelector('input[name="model-category"]:checked').checked = false;
        document.querySelector('input[name="model-category"]').checked = true;
        document.querySelector('#model .filter-select').value = 'View all colors';
        
        console.log('清除所有模型过滤条件');
        
        // 显示所有模型卡片
        const modelCards = document.querySelectorAll('.model-card');
        modelCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // 更新结果数量
        const resultCount = document.querySelector('#model .filters p');
        resultCount.textContent = '16 Results';
    });
}

// 图片画廊效果
function imageGallery() {
    const productImages = document.querySelectorAll('.product-item img');
    
    productImages.forEach(image => {
        // 添加加载动画效果
        image.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // 初始化透明度
        image.style.opacity = '0';
        image.style.transition = 'opacity 0.3s ease';
    });
}

// 关卡过滤和排序功能
function levelFiltering() {
    const difficultyFilter = document.getElementById('difficulty-filter');
    const sortFilter = document.getElementById('sort-filter');
    const levelItems = document.querySelectorAll('.level-item');
    
    // 应用过滤和排序
    function applyFilterAndSort() {
        const selectedDifficulty = difficultyFilter.value;
        const selectedSort = sortFilter.value;
        
        // 先过滤
        levelItems.forEach(item => {
            const itemDifficulty = item.getAttribute('data-difficulty');
            
            if (selectedDifficulty === 'all' || itemDifficulty === selectedDifficulty) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        
        // 再排序
        const visibleItems = Array.from(levelItems).filter(item => !item.classList.contains('hidden'));
        
        visibleItems.sort((a, b) => {
            const levelA = parseInt(a.getAttribute('data-level'));
            const levelB = parseInt(b.getAttribute('data-level'));
            const difficultyA = a.getAttribute('data-difficulty');
            const difficultyB = b.getAttribute('data-difficulty');
            
            if (selectedSort === 'level-asc') {
                return levelA - levelB;
            } else if (selectedSort === 'level-desc') {
                return levelB - levelA;
            } else if (selectedSort === 'difficulty') {
                // 按难度排序：beginner -> intermediate -> advanced
                const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
                return difficultyOrder[difficultyA] - difficultyOrder[difficultyB];
            }
            return 0;
        });
        
        // 更新DOM顺序
        const levelGrid = document.querySelector('.level-grid');
        visibleItems.forEach(item => {
            levelGrid.appendChild(item);
        });
        
        // 重新设置关卡图片初始状态和事件监听器
        levelImageToggle();
    }
    
    // 监听筛选和排序变化
    difficultyFilter.addEventListener('change', applyFilterAndSort);
    sortFilter.addEventListener('change', applyFilterAndSort);
    
    // 初始应用一次
    applyFilterAndSort();
}

// 关卡图片下拉显示功能
function levelImageToggle() {
    // 获取所有关卡卡片
    const levelItems = document.querySelectorAll('.level-item');
    
    // 为每个关卡卡片添加功能
    levelItems.forEach(item => {
        // 获取元素
        const levelImage = item.querySelector('.level-image');
        const levelActions = item.querySelector('.level-actions');
        
        // 替换按钮
        levelActions.innerHTML = '<button class="btn btn-primary view-level-btn">View Level</button>';
        
        // 获取新创建的按钮
        const viewBtn = item.querySelector('.view-level-btn');
        
        // 添加点击事件
        viewBtn.addEventListener('click', () => {
            if (!levelImage.classList.contains('expanded')) {
                levelImage.classList.add('expanded');
                viewBtn.textContent = 'Hide Level';
            } else {
                levelImage.classList.remove('expanded');
                viewBtn.textContent = 'View Level';
            }
        });
        
        // 初始隐藏图片
        levelImage.classList.remove('expanded');
    });
}

// 移动端菜单切换（如果需要）
function mobileMenuToggle() {
    // 这里可以添加移动端菜单的切换逻辑
    // 例如：点击汉堡菜单按钮显示/隐藏导航菜单
}

// 价格范围滑块功能
function priceRangeSlider() {
    const priceRange = document.querySelector('.price-range input[type="range"]');
    
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const value = this.value;
            console.log('价格范围:', value);
            
            // 这里可以添加价格范围变化的逻辑
            // 例如：更新价格显示
        });
    }
}

// 添加到购物车功能
function addToCart() {
    // 这里可以添加产品添加到购物车的逻辑
    // 例如：点击产品卡片添加到购物车
}

// 模态框功能（如果需要）
function modalFunctionality() {
    // 这里可以添加模态框的显示/隐藏逻辑
    // 例如：点击产品查看详情
}

// 响应式调整
window.addEventListener('resize', function() {
    // 这里可以添加响应式调整的逻辑
    // 例如：根据屏幕大小调整布局
});

// 滚动事件监听
window.addEventListener('scroll', function() {
    // 这里可以添加滚动相关的逻辑
    // 例如：滚动时显示/隐藏返回顶部按钮
    
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// 管理员控制台功能
// 显示/隐藏管理员控制台
function toggleAdminConsole() {
    const adminConsole = document.getElementById('admin-console');
    const overlay = document.getElementById('overlay');
    
    adminConsole.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

// 切换标签页
function switchTab(tabName) {
    // 移除所有标签页的活动状态
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // 激活当前标签页
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // 如果切换到关卡、模型、故事、产品、分享或创作者标签，动态生成图片管理界面
    if (tabName === 'level') {
        generateLevelImages();
    } else if (tabName === 'model') {
        generateModelImages();
    } else if (tabName === 'story') {
        generateStoryImages();
    } else if (tabName === 'product') {
        generateProductImages();
    } else if (tabName === 'share') {
        generateShareImages();
    } else if (tabName === 'creator') {
        generateCreatorImages();
    }
}

// 图片预览功能
function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            document.getElementById(previewId).src = e.target.result;
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// 图片上传功能
function uploadImage(type) {
    let fileInput, currentImage, pageImage, fileName;
    
    if (type === 'hero') {
        fileInput = document.getElementById('hero-upload');
        currentImage = document.getElementById('hero-current-img');
        pageImage = document.getElementById('page-hero-image');
        fileName = 'hero-image.jpg';
    }
    
    console.log('开始上传图片，类型:', type);
    console.log('文件输入:', fileInput);
    
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        
        console.log('选择的文件:', file);
        console.log('文件名:', fileName);
        
        // 显示加载状态
        // alert('正在上传图片，请稍候...');
        console.log('正在上传图片，请稍候...');
        
        // 使用XMLHttpRequest直接发送文件，不使用FormData
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/upload?filename=${fileName}`, true);
        xhr.setRequestHeader('Content-Type', file.type);
        
        xhr.onload = function() {
            console.log('上传完成，状态码:', xhr.status);
            console.log('响应文本:', xhr.responseText);
            
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    console.log('解析后的响应:', data);
                    if (data.success) {
                        // 更新预览图
                        currentImage.src = URL.createObjectURL(file);
                        
                        // 更新网页上实际显示的图片
                        if (pageImage) {
                            pageImage.src = `/assets/images/${fileName}?t=${Date.now()}`;
                        }
                        
                        // 显示成功消息
                        alert('图片上传成功！');
                    } else {
                        alert('图片上传失败：' + data.message);
                    }
                } catch (error) {
                    console.error('解析响应失败:', error);
                    alert('图片上传成功，但解析响应失败！');
                    // 直接更新图片，假设上传成功
                    currentImage.src = URL.createObjectURL(file);
                    if (pageImage) {
                        pageImage.src = `/assets/images/${fileName}?t=${Date.now()}`;
                    }
                }
            } else {
                alert('图片上传失败，状态码：' + xhr.status + '，响应：' + xhr.responseText);
            }
        };
        
        xhr.onerror = function() {
            console.error('上传错误');
            alert('图片上传失败，请检查服务器是否运行！');
        };
        
        xhr.ontimeout = function() {
            console.error('上传超时');
            alert('图片上传超时，请稍后重试！');
        };
        
        // 设置超时时间
        xhr.timeout = 10000; // 10秒
        
        // 发送文件
        console.log('发送文件...');
        xhr.send(file);
        
        // 重置文件输入
        fileInput.value = '';
    } else {
        alert('请先选择要上传的图片！');
    }
}

// 上传关卡图片
function uploadLevelImage(level) {
    const fileInput = document.getElementById(`level-${level}-upload`);
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const fileName = `level-${level}.png`;
        
        // 显示加载状态
        alert('正在上传图片，请稍候...');
        
        // 使用XMLHttpRequest直接发送文件
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/upload?filename=${fileName}`, true);
        xhr.setRequestHeader('Content-Type', file.type);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        // 更新控制台中的预览图
                        const previewImg = document.getElementById(`level-${level}-img`);
                        if (previewImg) {
                            previewImg.src = URL.createObjectURL(file);
                        }
                        
                        // 更新网页上所有对应的关卡图片
                        const pageLevelImages = document.querySelectorAll(`img[src*="level-${level}.png"]`);
                        pageLevelImages.forEach(img => {
                            img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                        });
                        
                        // 显示成功消息
                        alert(`关卡${level}图片上传成功！`);
                    } else {
                        alert('图片上传失败：' + data.message);
                    }
                } catch (error) {
                    alert('图片上传成功，但解析响应失败！');
                    // 直接更新图片，假设上传成功
                    const previewImg = document.getElementById(`level-${level}-img`);
                    if (previewImg) {
                        previewImg.src = URL.createObjectURL(file);
                    }
                    const pageLevelImages = document.querySelectorAll(`img[src*="level-${level}.png"]`);
                    pageLevelImages.forEach(img => {
                        img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                    });
                }
            } else {
                alert('图片上传失败，状态码：' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            alert('图片上传失败，请检查服务器是否运行！');
        };
        
        // 发送文件
        xhr.send(file);
        
        // 重置文件输入
        fileInput.value = '';
    } else {
        alert('请先选择要上传的图片！');
    }
}

// 动态生成关卡图片管理界面
function generateLevelImages() {
    const container = document.querySelector('.level-images-grid');
    container.innerHTML = '';
    
    // 生成27个关卡图片管理项
    for (let i = 1; i <= 27; i++) {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        imageItem.innerHTML = `
            <p>关卡 ${i}</p>
            <img id="level-${i}-img" src="assets/images/level-${i}.png" alt="关卡 ${i}">
            <input type="file" id="level-${i}-upload" accept="image/*" onchange="previewImage(this, 'level-${i}-img')">
            <button onclick="uploadLevelImage(${i})">保存</button>
        `;
        
        container.appendChild(imageItem);
    }
}

// 上传模型图片
function uploadModelImage(modelId) {
    const fileInput = document.getElementById(`model-${modelId}-upload`);
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const fileName = `model${modelId}.png`;
        
        // 显示加载状态
        alert('正在上传图片，请稍候...');
        
        // 使用XMLHttpRequest直接发送文件
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/upload?filename=${fileName}`, true);
        xhr.setRequestHeader('Content-Type', file.type);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        // 更新控制台中的预览图
                        const previewImg = document.getElementById(`model-${modelId}-img`);
                        if (previewImg) {
                            previewImg.src = URL.createObjectURL(file);
                        }
                        
                        // 更新网页上所有对应的模型图片
                        const pageModelImages = document.querySelectorAll(`img[src*="model${modelId}.png"]`);
                        pageModelImages.forEach(img => {
                            img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                        });
                        
                        // 显示成功消息
                        alert(`模型${modelId}图片上传成功！`);
                    } else {
                        alert('图片上传失败：' + data.message);
                    }
                } catch (error) {
                    alert('图片上传成功，但解析响应失败！');
                    // 直接更新图片，假设上传成功
                    const previewImg = document.getElementById(`model-${modelId}-img`);
                    if (previewImg) {
                        previewImg.src = URL.createObjectURL(file);
                    }
                    const pageModelImages = document.querySelectorAll(`img[src*="model${modelId}.png"]`);
                    pageModelImages.forEach(img => {
                        img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                    });
                }
            } else {
                alert('图片上传失败，状态码：' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            alert('图片上传失败，请检查服务器是否运行！');
        };
        
        // 发送文件
        xhr.send(file);
        
        // 重置文件输入
        fileInput.value = '';
    } else {
        alert('请先选择要上传的图片！');
    }
}

// 动态生成模型图片管理界面
function generateModelImages() {
    const container = document.querySelector('.model-images-grid');
    container.innerHTML = '';
    
    // 生成16个模型图片管理项
    for (let i = 1; i <= 16; i++) {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        imageItem.innerHTML = `
            <p>模型 ${i}</p>
            <img id="model-${i}-img" src="assets/images/model${i}.png" alt="模型 ${i}">
            <input type="file" id="model-${i}-upload" accept="image/*" onchange="previewImage(this, 'model-${i}-img')">
            <button onclick="uploadModelImage(${i})">保存</button>
        `;
        
        container.appendChild(imageItem);
    }
}

// 上传故事图片
function uploadStoryImage(storyId) {
    const fileInput = document.getElementById(`story-${storyId}-upload`);
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        // 获取对应故事图片的类型
        const storyImages = ['intro', 'challenge', 'solution', 'vision'];
        const imageType = storyImages[storyId - 1];
        const fileName = `story-${imageType}.jpg`;
        
        // 显示加载状态
        alert('正在上传图片，请稍候...');
        
        // 使用FormData格式上传文件
        const formData = new FormData();
        formData.append('image', file);
        formData.append('fileName', fileName);
        
        // 添加调试日志
        console.log('开始上传图片:', {
            storyId: storyId,
            fileName: fileName,
            fileType: file.type,
            fileSize: file.size
        });
        
        const xhr = new XMLHttpRequest();
        // 使用相对URL，兼容GitHub Pages
        xhr.open('POST', '/upload', true);
        
        xhr.onload = function() {
            console.log('上传响应:', {
                status: xhr.status,
                response: xhr.responseText
            });
            
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    console.log('上传成功数据:', data);
                    
                    if (data.success) {
                        // 更新控制台中的预览图
                        const previewImg = document.getElementById(`story-${storyId}-img`);
                        if (previewImg) {
                            previewImg.src = URL.createObjectURL(file);
                        }
                        
                        // 更新网页上所有对应的故事图片
                        const pageStoryImages = document.querySelectorAll(`img[src*="story-${imageType}.jpg"]`);
                        pageStoryImages.forEach(img => {
                            // 使用相对URL，兼容GitHub Pages
                            img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                        });
                        
                        // 显示成功消息
                        alert(`故事图片${storyId}上传成功！`);
                    } else {
                        alert('图片上传失败：' + data.message);
                    }
                } catch (error) {
                    console.error('解析响应失败:', error);
                    alert('图片上传成功，但解析响应失败！');
                    // 直接更新图片，假设上传成功
                    const previewImg = document.getElementById(`story-${storyId}-img`);
                    if (previewImg) {
                        previewImg.src = URL.createObjectURL(file);
                    }
                    const pageStoryImages = document.querySelectorAll(`img[src*="story-${imageType}.jpg"]`);
                    pageStoryImages.forEach(img => {
                        // 使用相对URL，兼容GitHub Pages
                        img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                    });
                }
            } else {
                alert('图片上传失败，状态码：' + xhr.status + '，请查看浏览器控制台获取详情');
            }
        };
        
        xhr.onerror = function() {
            console.error('网络错误:', xhr);
            alert('图片上传失败，请检查服务器是否运行！');
        };
        
        // 发送FormData
        xhr.send(formData);
        
        // 重置文件输入
        fileInput.value = '';
    } else {
        alert('请先选择要上传的图片！');
    }
}

// 动态生成故事图片管理界面
function generateStoryImages() {
    const container = document.querySelector('.story-images-grid');
    container.innerHTML = '';
    
    // 故事图片类型
    const storyImages = ['intro', 'challenge', 'solution', 'vision'];
    
    storyImages.forEach((imageType, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        imageItem.innerHTML = `
            <p>${imageType.charAt(0).toUpperCase() + imageType.slice(1)}</p>
            <img id="story-${index + 1}-img" src="assets/images/story-${imageType}.jpg" alt="故事 ${imageType}">
            <input type="file" id="story-${index + 1}-upload" accept="image/*" onchange="previewImage(this, 'story-${index + 1}-img')">
            <button onclick="uploadStoryImage(${index + 1})">保存</button>
        `;
        
        container.appendChild(imageItem);
    });
}

// 轮播功能实现 - 无缝快速平移变换
// 确保页面加载完成后执行轮播初始化
function initCarousel() {
    const carouselSlide = document.querySelector('.carousel-slide');
    if (carouselSlide) {
        const productItems = document.querySelectorAll('.carousel-slide .product-item');
        
        // 移除所有克隆项，避免重复克隆
        const existingClones = carouselSlide.querySelectorAll('.product-item:nth-child(n+' + (productItems.length + 1) + ')');
        existingClones.forEach(clone => clone.remove());
        
        // 复制产品项以实现无缝轮播
        if (productItems.length > 0) {
            // 克隆产品项并添加到轮播末尾
            productItems.forEach(item => {
                const clone = item.cloneNode(true);
                carouselSlide.appendChild(clone);
            });
        }
        
        // 确保动画正在运行
        carouselSlide.style.animationPlayState = 'running';
    }
}

// 在文档加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    
    // 监听窗口大小变化，重新初始化轮播
    window.addEventListener('resize', initCarousel);
});

// 上传产品图片，对应store页面上的Product 1-12
function uploadProductImage(productId) {
    const fileInput = document.getElementById(`product-${productId}-upload`);
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        // 使用product${productId}.jpg格式，对应store页面上的Product 1-12
        const fileName = `product${productId}.jpg`;
        
        // 显示加载状态
        alert('正在上传图片，请稍候...');
        
        // 使用FormData格式上传文件，兼容GitHub Pages
        const formData = new FormData();
        formData.append('image', file);
        formData.append('fileName', fileName);
        
        // 添加调试日志
        console.log('开始上传产品图片:', {
            productId: productId,
            fileName: fileName,
            fileType: file.type,
            fileSize: file.size
        });
        
        const xhr = new XMLHttpRequest();
        // 使用相对URL，兼容GitHub Pages
        xhr.open('POST', '/upload', true);
        
        xhr.onload = function() {
            console.log('产品图片上传响应:', {
                status: xhr.status,
                response: xhr.responseText
            });
            
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    console.log('产品图片上传成功数据:', data);
                    
                    if (data.success) {
                        // 更新控制台中的预览图
                        const previewImg = document.getElementById(`product-${productId}-img`);
                        if (previewImg) {
                            previewImg.src = URL.createObjectURL(file);
                        }
                        
                        // 更新store页面上对应位置的产品图片，通过alt属性"Product 1"到"Product 12"来标识
                        const storeProductImages = document.querySelectorAll(`img[alt="Product ${productId}"]`);
                        storeProductImages.forEach(img => {
                            // 使用相对URL，兼容GitHub Pages
                            img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                            // 移除占位符样式，显示实际图片
                            img.removeAttribute('style');
                        });
                        
                        // 显示成功消息
                        alert(`产品${productId}图片上传成功！`);
                    } else {
                        alert('图片上传失败：' + data.message);
                    }
                } catch (error) {
                    console.error('解析产品图片上传响应失败:', error);
                    alert('图片上传成功，但解析响应失败！');
                    // 直接更新图片，假设上传成功
                    const previewImg = document.getElementById(`product-${productId}-img`);
                    if (previewImg) {
                        previewImg.src = URL.createObjectURL(file);
                    }
                    // 直接更新store页面上的图片
                    const storeProductImages = document.querySelectorAll(`img[alt="Product ${productId}"]`);
                    storeProductImages.forEach(img => {
                        // 使用相对URL，兼容GitHub Pages
                        img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                        // 移除占位符样式，显示实际图片
                        img.removeAttribute('style');
                    });
                }
            } else {
                alert('图片上传失败，状态码：' + xhr.status + '，请查看浏览器控制台获取详情');
            }
        };
        
        xhr.onerror = function() {
            console.error('产品图片上传网络错误:', xhr);
            alert('图片上传失败，请检查服务器是否运行！');
        };
        
        // 发送FormData
        xhr.send(formData);
        
        // 重置文件输入
        fileInput.value = '';
    } else {
        alert('请先选择要上传的图片！');
    }
}

// 动态生成产品图片管理界面
function generateProductImages() {
    const container = document.querySelector('.product-images-grid');
    container.innerHTML = '';
    
    // 生成12个产品图片管理项，对应store页面上的Product 1-12
    for (let i = 1; i <= 12; i++) {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        imageItem.innerHTML = `
            <p>Product ${i}</p>
            <img id="product-${i}-img" src="" alt="Product ${i}" style="width: 200px; height: auto; background-color: #f0f0f0; border: 1px dashed #ccc; padding: 10px;">
            <input type="file" id="product-${i}-upload" accept="image/*" onchange="previewImage(this, 'product-${i}-img')">
            <button onclick="uploadProductImage(${i})">保存</button>
        `;
        
        container.appendChild(imageItem);
    }
    
    console.log('已生成12个产品图片管理项');
}

// 上传分享页面图片
function uploadShareImage(shareId) {
    const fileInput = document.getElementById(`share-${shareId}-upload`);
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        // 获取对应分享图片的类型
        const shareImages = ['level', 'model'];
        const imageType = shareImages[shareId - 1];
        const fileName = `upload-${imageType}.jpg`;
        
        // 显示加载状态
        alert('正在上传图片，请稍候...');
        
        // 使用XMLHttpRequest直接发送文件
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `/upload?filename=${fileName}`, true);
        xhr.setRequestHeader('Content-Type', file.type);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        // 更新控制台中的预览图
                        const previewImg = document.getElementById(`share-${shareId}-img`);
                        if (previewImg) {
                            previewImg.src = URL.createObjectURL(file);
                        }
                        
                        // 更新网页上所有对应的分享图片
                        const pageShareImages = document.querySelectorAll(`img[src*="upload-${imageType}.jpg"]`);
                        pageShareImages.forEach(img => {
                            img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                        });
                        
                        // 显示成功消息
                        alert(`分享页面图片${shareId}上传成功！`);
                    } else {
                        alert('图片上传失败：' + data.message);
                    }
                } catch (error) {
                    alert('图片上传成功，但解析响应失败！');
                    // 直接更新图片，假设上传成功
                    const previewImg = document.getElementById(`share-${shareId}-img`);
                    if (previewImg) {
                        previewImg.src = URL.createObjectURL(file);
                    }
                    const pageShareImages = document.querySelectorAll(`img[src*="upload-${imageType}.jpg"]`);
                    pageShareImages.forEach(img => {
                        img.src = `/assets/images/${fileName}?t=${Date.now()}`;
                    });
                }
            } else {
                alert('图片上传失败，状态码：' + xhr.status);
            }
        };
        
        xhr.onerror = function() {
            alert('图片上传失败，请检查服务器是否运行！');
        };
        
        // 发送文件
        xhr.send(file);
        
        // 重置文件输入
        fileInput.value = '';
    } else {
        alert('请先选择要上传的图片！');
    }
}

// 动态生成分享页面图片管理界面
function generateShareImages() {
    const container = document.querySelector('.share-images-grid');
    container.innerHTML = '';
    
    // 分享图片类型
    const shareImages = ['level', 'model'];
    
    shareImages.forEach((imageType, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        imageItem.innerHTML = `
            <p>上传${imageType.charAt(0).toUpperCase() + imageType.slice(1)}</p>
            <img id="share-${index + 1}-img" src="assets/images/upload-${imageType}.jpg" alt="分享页面 ${imageType}">
            <input type="file" id="share-${index + 1}-upload" accept="image/*" onchange="previewImage(this, 'share-${index + 1}-img')">
            <button onclick="uploadShareImage(${index + 1})">保存</button>
        `;
        
        container.appendChild(imageItem);
    });
}

// 上传创作者照片
function uploadCreatorImage(creatorName) {
    const fileInput = document.getElementById(`creator-${creatorName}-upload`);
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        
        // 显示加载状态
        alert('正在上传图片，请稍候...');
        
        // 使用FileReader读取文件
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imgData = e.target.result;
            
            // 将图片数据保存到localStorage
            localStorage.setItem(`creator-${creatorName}-img`, imgData);
            
            // 更新控制台中的预览图
            const previewImg = document.getElementById(`creator-${creatorName}-img`);
            if (previewImg) {
                previewImg.src = imgData;
            }
            
            // 更新页面上对应的创作者照片
            const creatorImages = document.querySelectorAll(`.creator-photo img`);
            creatorImages.forEach(img => {
                if (img.alt === creatorName) {
                    img.src = imgData;
                }
            });
            
            // 显示成功消息
            alert(`${creatorName}的照片上传成功！`);
            
            // 重置文件输入
            fileInput.value = '';
        };
        
        // 读取文件
        reader.readAsDataURL(file);
    } else {
        alert('请先选择要上传的图片！');
    }
}

// 从localStorage加载创作者照片
function loadCreatorImages() {
    const creators = ['Skywalker', 'Lally'];
    
    creators.forEach(creatorName => {
        // 从localStorage获取图片数据
        const imgData = localStorage.getItem(`creator-${creatorName}-img`);
        
        if (imgData) {
            // 更新控制台中的预览图（如果存在）
            const previewImg = document.getElementById(`creator-${creatorName}-img`);
            if (previewImg) {
                previewImg.src = imgData;
            }
            
            // 更新页面上对应的创作者照片
            const creatorImages = document.querySelectorAll(`.creator-photo img`);
            creatorImages.forEach(img => {
                if (img.alt === creatorName) {
                    img.src = imgData;
                }
            });
        }
    });
}

// 在页面加载时从localStorage加载创作者照片
document.addEventListener('DOMContentLoaded', function() {
    loadCreatorImages();
});

// 动态生成创作者照片管理界面
function generateCreatorImages() {
    const container = document.querySelector('.creator-images-grid');
    container.innerHTML = '';
    
    // 创作者列表
    const creators = ['Skywalker', 'Lally'];
    
    creators.forEach(creatorName => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        // 检查图片是否存在，使用默认图片作为备选
        const defaultImage = 'assets/images/product1.jpg'; // 使用现有图片作为默认值
        const imageSrc = `assets/images/creator-${creatorName.toLowerCase()}.jpg`;
        
        imageItem.innerHTML = `
            <p>${creatorName}</p>
            <img id="creator-${creatorName}-img" src="${imageSrc}" alt="${creatorName}" onerror="this.src='${defaultImage}'">
            <input type="file" id="creator-${creatorName}-upload" accept="image/*" onchange="previewImage(this, 'creator-${creatorName}-img')">
            <button onclick="uploadCreatorImage('${creatorName}')">保存</button>
        `;
        
        container.appendChild(imageItem);
    });
}


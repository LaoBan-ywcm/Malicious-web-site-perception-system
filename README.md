# Malicious-web-site-perception-system（基于云计算的地区恶意网站态势感知系统）

## 简介

后端采用Flask，只返回一个根页面，主要作为后端接口使用，使用Python2.7
前端采用React，用到了百度的Echarts，使用Node.js v7.6.0

## 安装项目

```
    git clone https://github.com/LaoBan-ywcm/Malicious-web-site-perception-system.git  
```

## 安装项目依赖

### 推荐使用virtualenv创建虚拟环境

```
    cd Malicious-web-site-perception-system.git  
    virtualenv venv --python=python2.7 --system-site-packages  
```

### 安装后端依赖

```
    source venv/bin/activate  
    cd source  
    pip install -r requirements.txt  
```

### 安装前端依赖(推荐使用cnpm)

```
    cd static  
    cnpm install  
    npm start  
```

### 启动项目

注意：要在启动项目前打开Mongodb服务

```
    cd Malicious-web-site-perception-system/source  
    python manage.py runserver  
```

在浏览器中打开http://127.0.0.1:8000/


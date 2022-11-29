### 请注意先配置虚拟环境再调用cx_freeze有效压缩时间及大小
### cx_freeze的setup.py请务必放在主文件入口同级目录
### 引用自定义py务必使用目录结构+ __init__.py

### Please use virtualenv to make sure the cx_freeze can work in control
### This will less the final .exe file.
### The script setup.py file should be placed in same fold with main py file or cx_freeze cannot find the class Api
from cx_Freeze import setup, Executable
import sys
from setuptools import find_packages

build_exe_options = {"optimize": 2,"include_files": ["SqlUtil.py"]}
base = "Win32GUI"
 
if sys.platform == 'win64':base = 'Win64GUI'


excluded_packs=['altgraph', 'asyncio', 'certifi', 'cffi', 'clr_loader',  'colorama', 'concurrent', 'contourpy', 'ctypes', 'curses', 'dateutil', 'distutils', 'email',  'fontTools', 'html', 'http',  'importlib_metadata', 'jinja2', 'json', 'kiwisolver', 'lib2to3', 'logging', 'markupsafe', 'matplotlib', 'mpl_toolkits', 'multiprocessing', 'numpy', 'ordlookup', 'packaging', 'PIL', 'pkg_resources', 'proxy_tools', 'pycparser', 'pydoc_data', 'PyInstaller', 'pyparsing',  'pytz', 'scipy', 'setuptools', 'tcltk', 'test', 'tkinter', 'tornado', 'unittest', 'urllib', 'webview', 'win32com', 'win32ctypes', 'wsgiref', 'xml', 'xmlrpc', '_distutils_hack']
included_packs=['os','tkinter','shutil','datetime','time','webview','logging','proxy_tools','multiprocessing','json','http','email','html','urllib','wsgiref','pythonnet']        
for i in included_packs:
    if i in excluded_packs:
        excluded_packs.remove(i)
build_exe_options = {
                     'include_files': ['web/']
                     }



k = ["main_window.py"]
executables = [Executable(script="test.py",base=base,targetName='P4S.exe',icon = "My.ico")]
setup(
    name="processing4 Scaffold",
    version="1.0",
    description="用来生成processing4项目架构",
    options = {"build_exe": build_exe_options},
    executables=executables)
input("请输入任意键结束...")

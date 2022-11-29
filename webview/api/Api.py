import tkinter as tk
from tkinter import filedialog
import os
import shutil
import datetime
from time import strftime

class Api:
    #ok
    def checkDir(self,dir,type):
        if(type):
            g = []
            for i in os.listdir(dir):
                temp = dir+"/"+i
                if(not(os.path.isfile(temp))):
                    if(".config" in os.listdir(temp) and ("image.png" in os.listdir(temp+"/.config") and "info" in os.listdir(temp+"/.config"))):
                        g.append({"title":i,"path":temp})
                else:
                    continue
            return g
        else:
            g = []
            for i in os.listdir(dir):
                temp = dir+"/"+i
                if(".pde" in i):
                    f = open(temp,"r",encoding="utf-8")
                    for j in f.readlines():
                        if "* 库名 Library：" in j:
                            g.append({"title":i,"path":temp})
                            break
            return g
    #ok
    def selectDir(self,type):
        root = tk.Tk()
        root.withdraw()
        Folderpath = filedialog.askdirectory()  # 获得选择好的文件夹
        print('共享的文件夹%s' % Folderpath)
        root.destroy()
        if(type):
            collection = self.checkDir(Folderpath,True)
        else:
            collection = self.checkDir(Folderpath,False)
        return [Folderpath,collection]
    
    def searchDeatial(self,path):
        k = open(path+"/main/main.pde","r",encoding="utf-8")
        d = {}
        pos = False
        for i in k.readlines():
            if("* 作者 Author：" in i ):
                d['author'] = i.replace("* 作者 Author：","")
            elif("* 库名 Library：" in i):
                d['title'] = i.replace("* 库名 Library：","")
            elif("* 描述 Description" in i):
                d['description'] = i.replace("* 描述 Description：","")
                pos = True
            elif("* 日期 Date：" in i):
                d['time'] = i.replace("* 日期 Date：","")
            elif("*" not in i):
                break
            elif("*/" in i):
                break
            elif(pos):
                d['description'] +="\n"+ i[1:]
        return d

    def searchLib(self,path):
        k = open(path,"r",encoding="utf-8")
        d = {}
        pos = False
        for i in k.readlines():
            if("* 作者 Author：" in i ):
                d['author'] = i.replace("* 作者 Author：","")
            elif("* 库名 Library：" in i):
                d['title'] = i.replace("* 库名 Library：","")
            elif("* 描述 Description" in i):
                d['description'] = i.replace("* 描述 Description：","")
                pos = True
            elif("* 日期 Date：" in i):
                d['time'] = i.replace("* 日期 Date：","")
            elif("*" not in i):
                break
            elif("*/" in i):
                break
            elif(pos):
                d['description'] +="\n"+ i[1:]
        return d


    def createCollection(self,da):
        path = da['path']
        lib = da['lib']
        libpath = da['libpath']
        author = da['author']
        description=da['description']
        if(da['title'] != ""):
            name = da['title']
        else:
            name = "Sketch"
        if(os.path.exists(path+"/"+name)):
            for i in range(0,99999999):
                if(not(os.path.exists(path+"/"+name+"_"+str(i)))):
                    name = name +" "+str(i)
                    name = name.replace(" ","_")
                    break
        now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        os.mkdir(path+"/"+name)
        path = path +"/"+name
        os.mkdir(path+"/"+".config")
        f = open(path+"/"+".config/info","w",encoding="utf-8")
        f.write("AUTHOR="+author+"\nTITLE="+name+"\nDESCRIPTION="+description+"\nTIME="+now)
        f.close()
        shutil.copy("web/processing.png",path+"/.config/image.png")
        os.mkdir(path+"/"+"media")
        os.mkdir(path+"/"+"main")
        f = open(path+"/"+"start.bat","w",encoding="utf-8")
        f.write("@echo off\n") 
        f.write('if "%1" == "h" goto begin\n') 
        f.write('mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close)&&exit \n')
        f.write(':begin\n') 
        f.write("processing-java --sketch="+path+"/main --run")
        f.close()
        f = open("README.md","w",encoding="utf-8")
        f.write("/******项目详情说明******/\n# main是代码部分\n ## media是媒体文件")
        f.close()
        for i in lib:
            shutil.copy(i,path+"/"+"main/"+i.split("/")[-1])
        path = path + "/" + "main"
        f = open(path+"/"+"main.pde","w",encoding="utf-8")
        f.write("/*\n* 项目主体文件\n* 作者 Author："+author+"：\n* 日期 Date："+now+"\n* 描述 Description："+description+"\n*/")
        f.write('\nvoid setup(){\n\tsize(100,100);\n}\n\nvoid draw(){\n\t\n}\nvoid mousePressed(){\n\tsaveFrame("####.png");\n}\n')
        f.close()
        f = open(path+"/"+"algorithm.pde","w",encoding="utf-8")
        f.write("/*\n* 请在这里写需要操作的函数\n* please write global function here\n*/")
        f.write("void func(){\n\t\n}")
        f.close()
        f = open(path+"/"+"interface.pde","w",encoding="utf-8")
        f.write("/*\n* 请在这里写自定义类\n* please write yourself class here\n*/")
        f.write("class name{\n\t\n}")
        f.close()
        f = open(path+"/"+"globalData.pde","w",encoding="utf-8")
        f.write("/*\n* 请在这里写全局变量\n* please write globaldata here\n*/")
        f.close()
        return path[:-5]

    def createLib(self,da):
        path = da['path']
        if(da['title'] != ""):
            name = da['title']
        else:
            name = "Library"
        author = da['author']
        description=da['description']
        print("da",da)
        if(os.path.exists(path+"/"+name+".pde")):
            for i in range(0,99999999):
                if(not(os.path.exists(path+"/"+name+"_"+str(i)+".pde"))):
                    name = name +" "+str(i)
                    name = name.replace(" ","_")
                    break
        path = path +"/"+name
        print(path)
        now=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f = open(path+".pde","w",encoding="utf-8")
        f.write("/*\n* 库名 Library："+name+"\n* 作者 Author："+author+"\n* 日期 Date："+now+"\n* 描述 Description："+description+"\n*/")
        f.write("\nclass name{\n\tname(){}\n}")
        f.close()
        return path + ".pde"

    def openAny(self,path):
        print(path)
        if(".pde" not in path):
            path = path + "/main/main.pde"
        os.system("processing "+path)

    def changeImg(self,path):
        root = tk.Tk()
        root.withdraw()
        file = filedialog.askopenfilename(filetypes =[('Image file', '*.png;*.jpg;*.jpeg;*.jfif;*.bmp')])  # 获得选择好的文件夹
        print('共享的文件%s' % file)
        root.destroy()
        shutil.copy(file,path+"/.config/image.png")
        return file

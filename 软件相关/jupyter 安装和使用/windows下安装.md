# windows 下安装 jupyter

## 先安装 python3

这里直接去 python 官网安装即可

查看安装的 python 版本

```
python --version

一下是可能结果
----
Python 3.10.5
----
```

> 这里有一点要注意, window 上是 python 而不是 python3

## 然后按照 pip

网上说 python3 自带 pip, 其实不太正确...(win10 上下载最新 python3 确实自带, 但是 win7 上无法下载最新 python3, 可能不自带 pip)

[如何下载安装 pip](https://pip.pypa.io/en/stable/installation/)

pip 下载好后, 检查其版本

```
python -m pip --version

一下是可能结果
----
pip 22.1.2 from C:\Users\22480\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0\LocalCache\local-packages\Python310\site-packages\pip (python 3.10)
----
```

使用下面命名升级 pip

```
 python -m pip install --upgrade pip
```


## 安装 jupyter

```
python -m pip install jupyter

或者

pip install jupyter
```

安装成功后通过 `jupyter --version` 查看jupyter的所有依赖版本
```
IPython          : 8.4.0
ipykernel        : 6.14.0
ipywidgets       : 7.7.0
jupyter_client   : 7.3.4
jupyter_core     : 4.10.0
jupyter_server   : not installed
jupyterlab       : not installed
nbclient         : 0.6.4
nbconvert        : 6.5.0
nbformat         : 5.4.0
notebook         : 6.4.12
qtconsole        : 5.3.1
traitlets        : 5.2.2
```

此时可能还有依赖未安装, 需要手动安装

```
pip install jupyterlab jupyter_server
```


## 启动 jupyter

> 注意在 windows 7 中不要使用 powershell 操作
```
jupyter notebook
```

## 配置 jupyter

```
jupyter notebook --generate-config 

----
Writing default config to: C:\Users\22480\.jupyter\jupyter_notebook_config.py
----
```
使用上面命令生成默认配置文件

> 这个配置项很多


## 设置自己的密码

```
jupyter notebook password 
```

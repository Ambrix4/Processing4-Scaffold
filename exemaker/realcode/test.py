import webview
from api import Api

window = webview.create_window(
    title='Processing4 Scaffold',
    url='web/index.html',
    width=850,
    height=600,
    resizable=True,    # 固定窗口大小
    text_select=False,   # 禁止选择文字内容
    confirm_close=True,   # 关闭时提示
    js_api=Api.Api()
)
chinese = {
    'global.quitConfirmation': u'确定关闭?',
}
webview.start(localization=chinese)

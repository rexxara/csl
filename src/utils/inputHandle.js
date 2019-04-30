// 获取到焦点元素滚动到可视区
function activeElementScrollIntoView(activeElement, delay) {
    var editable = activeElement.getAttribute('contenteditable')

    // 输入框、textarea或富文本获取焦点后没有将该元素滚动到可视区
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || editable === '' || editable) {
        setTimeout(function () {
            activeElement.scrollIntoView();
        }, delay)
    }
}
const judgeDeviceType = function () {
    var ua = window.navigator.userAgent.toLocaleLowerCase();
    var isIOS = /iphone|ipad|ipod/.test(ua);
    var isAndroid = /android/.test(ua);

    return {
        isIOS: isIOS,
        isAndroid: isAndroid
    }
}()


const listenKeybord = {
    add: function (inputElement, focusCallback, blurCallback) {
        if (!(focusCallback && blurCallback)) {
        }
        const fcb = focusCallback.bind(inputElement)
        const bcb = blurCallback.bind(inputElement)
        const resize = function () {
            var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (originHeight < resizeHeight) {
                blurCallback(inputElement)
                // Android 键盘收起后操作
            } else {
                // Android 键盘弹起后操作
                focusCallback(inputElement)
                activeElementScrollIntoView(inputElement, 1000);
            }

            originHeight = resizeHeight;
        }

        if (judgeDeviceType.isIOS) {
            inputElement.addEventListener('focus', fcb, false)
            inputElement.addEventListener('blur', bcb)
        }
        if (judgeDeviceType.isAndroid) {
            var originHeight = document.documentElement.clientHeight || document.body.clientHeight;
            window.addEventListener('resize', resize, false)
        }
        return { inputElement, fcb, bcb, resize }
    },
    remove: function (listener) {
        window.removeEventListener('resize', listener.resize)
        listener.inputElement.removeEventListener('focus', listener.fcb)
        listener.inputElement.removeEventListener('blur', listener.bcb)
    }
}
export default listenKeybord
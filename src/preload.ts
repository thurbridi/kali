const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld(
    'api',
    {
        askForSomething: (number: any) => ipcRenderer.invoke('DO_SOMETHING', number)
    }
)
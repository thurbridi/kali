import { contextBridge, ipcRenderer } from 'electron'
import { IStorageAPI } from './index'

const storageAPI: IStorageAPI = {
    loadKey: (key) => ipcRenderer.invoke('storage:loadKey', key),
    storeKey: (key, value) => ipcRenderer.invoke('storage:storeKey', key, value),
    deleteKey: (key) => ipcRenderer.invoke('storage:deleteKey', key)
}

contextBridge.exposeInMainWorld('storageAPI', storageAPI)
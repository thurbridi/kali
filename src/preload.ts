import { AppState } from "./types/types"

const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld(
  'api',
  {
    loadState: () => ipcRenderer.invoke('LOAD_STATE'),
    saveState: (state: AppState) => ipcRenderer.invoke('SAVE_STATE', state)
  }
)
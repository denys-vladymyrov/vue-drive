import http from "@/api/http"

export const starredFiles = () => http.get(`/files?starred=true`)
export const addFileToStarred = (file: any) => http.put(`/files/${file.id}`, { ... file, starred: true })
export const removeFileFromStarred = (file: any) => http.put(`/files/${file.id}`, { ... file, starred: false })
export const starredFolders = () => http.get(`/folders?starred=true`)
export const addFoldersToStarred = (folder: any) => http.put(`/folders/${folder.id}`, { ... folder, starred: true })
export const removeFolderFromStarred = (folder: any) => http.put(`/folders/${folder.id}`, { ... folder, starred: false })
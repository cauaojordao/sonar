import {api} from "@/lib/apiClient";

async function upload(file: File | Blob){
    const formData = new FormData();
    formData.append('file', file);

    return await api('/mxf', {
        method: 'POST',
        body: formData,
    });
}

export async function getStatus(id: string){
    return api(`/mxf?id=${id}`);
}

export{
    upload
}

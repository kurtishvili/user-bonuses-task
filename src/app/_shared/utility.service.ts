import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    objectToQueryString(obj : any): string {
        const params = new URLSearchParams();

        for (var field in obj) {
            if (obj[field] != null && obj[field] != '') {
                params.set(field, obj[field])
            }
        }

        return params.toString();
    }

    fileToBase64(file): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}
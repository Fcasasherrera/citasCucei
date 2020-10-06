import axios from 'axios';
let url = 'https://cuceimobile.tech/Escuela/datosudeg.php'

export const loginUDG = ({codigo, nip}) => {
    url += `?codigo=${codigo}&nip=${nip}`
    return new Promise<>((resolve, reject) => {
        axios.get(url)
            .then(res => {
                if (res.data === 0) {
                    resolve('err');
                }
                let response = {
                    name: res.data.split(',')[2],
                    codigo: res.data.split(',')[1],
                }
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}
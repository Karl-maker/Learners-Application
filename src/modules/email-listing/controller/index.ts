import { Response } from "@/modules/interfaces"

/**
 * @TODO use model to send to db / backend then use view to form response
 * @param email 
 */

const addToEmailList = async (email: string = ''): Promise<Response> => {
    return new Promise((res, rej) => {
        setTimeout(()=> {
            rej({
                message: "Added to email list",
            })
        }, 500)
    })
}

export default {
    addToEmailList
}
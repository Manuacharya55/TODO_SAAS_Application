import {z} from "zod";

export const validateData = (data,schema) => {
    const result = schema.safeParse(data)

    if(result.success){
        return {
            success : true,
            data : result.data
        }
    }else{
        return {
            success : false,
            errors : result.error.issues
        }
    }

}
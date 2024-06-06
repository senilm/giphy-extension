import prisma from "@/app/db";

export const GET = async (req, {params}) =>{
    try {
        const {userId} = params;
        const getLikes = await prisma.gifLike.findMany({
            where: {
                userId: userId
            },
            include: {
                gif: {
                    select: {
                        id: true, 
                        gifyId: true 
                    }
                }
            }
        })    
        const likes = getLikes.flatMap((item) => [item.gif.id, item.gif.gifyId]);
        return new Response(JSON.stringify(likes),{status:200})
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}),{status:500})
    }
}
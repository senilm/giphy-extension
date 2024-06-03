import prisma from "@/app/db"

export const GET = async (req,res)=>{
    const gifs = await prisma.gif.findMany({
        where:{
            userId:{
                not: null
            }
        },
        include:{
            user:true,
            Comment:true,
            GifLike:true
        }
    })

    return new Response(JSON.stringify(gifs), { status: 200 });
}




// if field is not null
// whereClause.push(
//     {
//       inwardId: {
//         not: null,
//       },
//     }
//   ) 
// } 
// if field is null
//   whereClause.push(
//     {
//       OR: [{ inwardId: null }, { inwardId: { isSet: false } }],
//     }
//   ) 

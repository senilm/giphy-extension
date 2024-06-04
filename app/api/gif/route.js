import prisma from "@/app/db"

export const POST = async (req,res)=>{
    const body = await req.json();
    const {friends, userId} = body;
    
    const whereClause = [];

    if(friends){
        const friends = await prisma.friends.findMany({
            where: {
              OR: [
                { userId: userId },
                { friendId: userId }
              ]
            },
            select:{
                friendId:true
            }
          });
          const friendsArray = friends.map((item)=>item.friendId);
          friendsArray.push(userId);
          whereClause.push({
            userId:{
                in:friendsArray
            }
        }) 
    }else{
        whereClause.push({
            userId:{
                not:null
            }
        }) 
    }

    const gifs = await prisma.gif.findMany({
        where: {
            AND: [...whereClause],
          },
        include:{
            user:true,
            Comment:true,
            GifLike:true
        },
        orderBy:
        {
            createdAt:"desc"
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

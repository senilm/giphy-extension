import prisma from "@/app/db";

// get friends gifs
export const GET = async (req, { params }) => {
  try {
    const { userId } = params;

    const friends = await prisma.friends.findMany({
      where: {
        userId: userId,
      },
    });

    if (!friends) {
      return new Response([], { status: 200 });
    }

    const friendIds = friends.map((friend) => friend.id);

    const gifs = await prisma.gif.findMany({
      where: {
        id: {
          $in: friendIds,
        },
      },
    });

    return new Response(gifs, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};

export const POST = async (req, { params }) => {
  try {
    const { userId } = params;

    const body = await req.json();

    const { gifURL, caption } = body;

    const GifCreation = await prisma.gif.create({
      data: {
        userId: userId,
        url: gifURL,
        caption,
        gifyId: "Fake" + gifURL + Math.random() * 1000,
      },
    });

    return new Response(JSON.stringify(GifCreation), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};

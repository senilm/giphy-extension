import prisma from "@/app/db";

export const POST = async (req, { params }) => {
  try {
    const reqData = await req.json();
    const { gifId } = params;
    const { userId, comment } = reqData;

    console.log(reqData);
    if (!userId || !gifId || !comment) {
      return new Response(
        JSON.stringify({ message: "Please provide required details" }),
        { status: 400 }
      );
    }

    //   check for user
    const isUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!isUser) {
      return new Response(JSON.stringify({ message: "User does not exist" }), {
        status: 400,
      });
    }

    //   check for gif
    const isGif = await prisma.gif.findUnique({
      where: {
        id: gifId,
      },
    });

    if (!isGif) {
      return new Response(JSON.stringify({ message: "GIF does not exist" }), {
        status: 400,
      });
    }

    // creation of comment
    const isCommented = await prisma.comment.create({
      data: {
        userId,
        gifId,
        comment,
      },
    });

    if (!isCommented) {
      return new Response(
        JSON.stringify({ message: "Failed to add comment" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Successfully added comment!!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};

export const GET = async (req, { params }) => {
  try {
    const { gifId } = params;

    if (!gifId) {
      return new Response(
        JSON.stringify({ message: "Please provide required details" }),
        { status: 400 }
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        gifId: gifId,
      },
      include: {
        user: true,
      },
    });

    if (!comments) {
      return new Response([], { status: 200 });
    }

    return new Response(comments, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};

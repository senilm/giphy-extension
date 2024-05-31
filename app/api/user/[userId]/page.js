import prisma from "@/app/db";

export const PATCH = async (req, { params }) => {
  try {
    const { userId } = params;
    const body = await req.json();

    const { name, email, profilePicture, bio } = body;

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name,
        email,
        profilePicture,
        bio,
      },
    });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });

  }
};

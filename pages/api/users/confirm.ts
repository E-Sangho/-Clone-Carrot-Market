import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseType>
) {
	const { token } = req.body;
	const foundedToken = await client.token.findUnique({
		where: {
			payload: token,
		},
	});
	if (!foundedToken) return res.status(404).end();
	req.session.user = {
		id: foundedToken?.userId,
	};
	await req.session.save();
	await client.token.deleteMany({
		where: {
			userId: foundedToken.userId,
		},
	});
	res.json({ ok: true });
}

export default withApiSession(
	withHandler({ methods: ["POST"], handler, isPrivate: false })
);

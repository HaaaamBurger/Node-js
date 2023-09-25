import {Request, Response, Router} from "express";

const router = Router();

const fsService = require("../fs.services");

interface IUser {
    name: string;
    age: number;
    gender: string;
}

const validChecker = (user: IUser) => {
    if (user.name.length > 3 && user.age >= 0) {
        return true;
    }
};

router.get("/", async (res: Response) => {
    const users = await fsService.reader();

    res.status(201).json({
        data: users,
    });
});

router.get("/:id", async (req: Request, res: Response) => {
    const users = await fsService.reader();
    const userId = (() => {
        const {id} = req.params;
        return +id - 1;
    })();

    try {
        if (!users[userId]) {
            throw new Error("No such a user!");
        }
        res.status(201).json(users[userId]);
    } catch (e) {
        res.status(404).json("No such a user!");
    }
});

router.post("/", async (req: Request, res: Response) => {
    const user = req.body;
    const users = await fsService.reader();

    try {
        if (validChecker(user)) {
            users.push(user);
            await fsService.writer(users);
            res.status(201).json({
                body: user,
                message: "User created!",
            });
        } else {
            throw new Error("Wrong validation!");
        }
    } catch (e) {
        res.status(404).json({
            message: "Wrong validation!",
        });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const users = await fsService.reader();
    const user = req.body;
    const userId = (() => {
        const {id} = req.params;
        return +id - 1;
    })();

    try {
        if (!users[userId]) {
            throw new Error("No such a user!");
        }

        if (!validChecker(user)) {
            throw new Error("Wrong validation!");
        }

        users[userId] = user;
        await fsService.writer(users);
        res.status(201).json({
            body: user,
            message: "User updated!",
        });
    } catch (e) {
        res.status(404).json({
            message: "Error",
        });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const users = await fsService.reader();
    const userId = (() => {
        const {id} = req.params;
        return +id - 1;
    })();

    try {
        if (!users[userId]) {
            throw new Error("No such a user!");
        }
        users.splice(userId, 1);
        await fsService.writer(users);
        res.status(201).json({
            message: "User deleted!",
        });
    } catch (e) {
        res.status(404).json({
            message: "No such a user!",
        });
    }
});
export const userRouter = router;

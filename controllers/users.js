import {
  readUsers,
  readEvents,
  readReceipts,
  writeEvents,
  writeUsers,
  writeReceipts
} from "../utils/utilityFunctions.js";

export const createUser = async (req, res) => {
  const { body } = req;
  console.log(body);

  try {
    const users = await readUsers();
    if (users.some((u) => u.userName === body.userName))
      throw new Error("This userName is already exist.");
    const newUser = {
      userName: body.userName,
      password: body.password,
    };

    users.push(newUser);
    await writeUsers(users);
    res
      .status(201)
      .json({ msg: "User registered successfully", data: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

export const buyTickets = async (req, res) => {
  const { body } = req;
  try {
    const users = await readUsers();
    const events = await readEvents();
    const receipts = await readReceipts();
    console.log(receipts);
    
    const event = events.find((e) => e.eventName === body.eventName);
    const user = users.find((u) => u.userName === body.userName);
    if (!event) throw new Error("There is no event named like this.");
    if (event.ticketsAvailable - body.quantity < 1)
      throw new Error("There are not enough tickets available.");
    if (!user) throw new Error("There is no user named like this");
    if (user.password != body.password)
      throw new Error("Password not matched.");
    const newReception = {
      userName: body.userName,
      eventName: body.eventName,
      ticketsBought: +body.quantity,
    };
    event.ticketsAvailable -= +body.quantity;
    receipts.push(newReception);
    await writeEvents(events);
    await writeReceipts(receipts);
    res
      .status(201)
      .json({ msg: "Tickets purchased successfully", data: newReception });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

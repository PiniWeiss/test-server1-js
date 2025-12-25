import {
  readEvents,
  readUsers,
  writeEvents,
} from "../utils/utilityFunctions.js";

export const createEvent = async (req, res) => {
  const { body } = req;
  try {
    const users = await readUsers();
    const events = await readEvents();
    if (events.some((e) => e.eventName === body.eventName))
      throw new Error("This eventName is already exist.");
    const user = users.find((u) => u.userName === body.userName);
    if (!user) throw new Error("There is no user named like this");
    if (user.password != body.password)
      throw new Error("Password not matched.");
    const newEvent = {
      eventName: body.eventName,
      ticketsAvailable: +body.ticketsForSale,
      createdBy: body.userName,
    };

    events.push(newEvent);
    await writeEvents(events);
    res.status(201).json({ msg: "Event created successfully", data: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "error" + err.message, data: null });
  }
};

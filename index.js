const TelegramBot = require('node-telegram-bot-api');
const mongoose = require("mongoose")

mongoose.connect("****")
  .then(() => console.log("mongodb is conncted"))
  .catch(err => console.log(err))

const productModel = require("./model/productModel")

const token = '****';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  // const inlinekeyboard = {
  //   reply_markup:{
  //     inline_keyboard:[
  //       [{text:"سفارش محصول", callback_data:""}]
  //     ]
  //   }
  // }
  bot.sendMessage(chatId, `به فروشگاه نی‌نگار خوش آمدید.\nجهت جستجو در محصولات اسم محصول مورد نظر را ارسال کنید 🙌`);
});

bot.onText("محصول", async (msg) => {
  const chatId = msg.chat.id;
  const product = await productModel.findById("67659596a2ca2549c3982cf0")

  bot.sendMessage(chatId, product.title);
  bot.sendPhoto(chatId, `https://api.neynegar1.ir/imgs/${product.cover}`, {
    caption: product.title
  })
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text.includes("/")) {
    if (!msg.text.includes("*")) {
      const regex = new RegExp(msg.text, "i")

      const products = await productModel.find({ title: { $regex: regex } })
        .select("title")
        .sort({ _id: -1 }).lean()

      const keyboard = {
        reply_markup: {
          keyboard: products.map(p => [`*${p.title}*`]),
          one_time_keyboard: true
        }
      }
      bot.sendMessage(chatId, "محصول مورد نظر را انتخاب کنید", keyboard);
    } else {
      console.log(msg.text);

      try {
        const product = await productModel.findOne({ title: msg.text.split("*")[1] })
          .select("_id title desc price discount cover")
          .sort({ _id: -1 }).lean()
        console.log(product);

        bot.sendPhoto(chatId, `https://api.neynegar1.ir/imgs/${product.cover}`, {
          caption: `${product.title}\n\n${product.desc}\nقیمت: ${product.discount ? (product.price[product.price.length - 1].price * ((100 - product.discount[product.discount.length - 1].discount) / 100)).toLocaleString('fa-IR') : product.price[product.price.length - 1].price.toLocaleString('fa-IR')}\nلینک محصول: https://neynegar1.ir/product/${product._id}`
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
});
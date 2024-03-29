//zod is used for schema validation
const zod = require("zod");

function validate1(arr) {
  // array consists of numbers
  const schema = zod.array(zod.number());

  // by using safeParse,it validate the data(it will compare with schema) and it will give response as
  //  {success:true,data:provided data}
  // {success:false,error:detail description}
  const response = schema.safeParse(arr);
  console.log(response);
}

//validate1([1,  3]);

//schema
// {
//   email=string should look like email (@,com)
//   password=string should have 8 letters
// }

// const schema=zod.object({
//   email:zod.string().email(),
//   password:zod.string().min(8)
// })

function validate2(obj) {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
  });
  const response = schema.safeParse(obj);
  console.log(response);
}

validate2({
  email: "",
  password: "ergetfft",
});

//some validations are
// zod.string().max(5);
// zod.string().min(5);
// zod.string().length(5);
// zod.string().email();
// zod.string().url()
// zod.string().regex(regex);
// zod.string().includes(string);
// zod.string().startsWith(string);
// zod.string().endsWith(string);

//When using validation methods, you can pass in an additional argument to provide a custom error message.
//zod.string().min(5, { message: "Must be 5 or more characters long"});

//Zod includes a handful of number-specific validations.
// zod.number().gt(5);
// zod.number().gte(5); // alias .min(5)
// zod.number().lt(5);
// zod.number().lte(5)
// zod.number().positive(); //     > 0
// zod.number().nonnegative(); //  >= 0
// zod.number().negative(); //     < 0
// zod.number().nonpositive()

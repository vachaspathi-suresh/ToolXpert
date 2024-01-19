export const checkValidNumber = (text, isInt) => {
  if (isInt) {
    let num = parseInt(text);
    if (num + "" === text) return { valid: true, num };
    else return { valid: false, num: 0 };
  } else {
    let num = parseFloat(text);
    if (num + "" === text) return { valid: true, num };
    else return { valid: false, num: 0 };
  }
};

export const factorial = (n) => {
  let f = BigInt(1);
  for (var i = 2; i <= n; i++) f *= BigInt(i);
  return f;
};

export const average = (num) => {
  let a = BigInt(0);
  num.forEach((i) => {
    a += BigInt(i);
  });
  a = (a * 1000n) / BigInt(num.length);
  return a.toString() === Number(a) + "" ? Number(a) / 1000 : a / 1000n;
};

export const bmi = (w, h) => {
  let fin = w / (h * h);
  let pos = "";
  if (fin < 18.5) pos = "UnderWeight";
  else if (fin < 25) pos = "Healthy Weight";
  else if (fin < 30) pos = "OverWeight";
  else pos = "Obesity";
  return { bmIndex: fin + "", cond: pos };
};

export const ageCalculate = (birthDate) => {
  birthDate = new Date(birthDate);
  let otherDate = new Date();
  var years = otherDate.getFullYear() - birthDate.getFullYear();
  if (
    otherDate.getMonth() < birthDate.getMonth() ||
    (otherDate.getMonth() == birthDate.getMonth() &&
      otherDate.getDate() < birthDate.getDate())
  ) {
    years--;
  }
  birthDate.setFullYear(otherDate.getFullYear());
  birthDate.setHours(0, 0, 0, 0);
  otherDate.setHours(0, 0, 0, 0);
  if (birthDate.getTime() < otherDate.getTime())
    birthDate.setFullYear(otherDate.getFullYear() + 1);
  diff = birthDate.getTime() - otherDate.getTime();
  days = Math.round(diff / (1000 * 60 * 60 * 24));
  return { years, days };
};

export const percentage = (X, Y, type) => {
  if (type === "t1") {
    return (X / 100) * Y;
  } else {
    return (X / Y) * 100 + "%";
  }
};

export const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

export const lcm = (a, b) => {
  return (a / gcd(a, b)) * b;
};

export const isPrime = (n) => {
  if (n <= 1) return false;
  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i = i + 6)
    if (n % i === 0 || n % (i + 2) === 0) return false;

  return true;
};

export const nextPrime = (n) => {
  if (n <= 1) return 2;

  let prime = n;
  let found = false;

  while (!found) {
    prime++;

    if (isPrime(prime)) found = true;
  }

  return prime;
};

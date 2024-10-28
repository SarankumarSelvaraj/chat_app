
enum SERVER_TYPE {
    dev = "dev",
    stage = "stage",
    prod = "prod",
};

enum GENDER {
    male = "male",
    female = "female",
    others = "others"
};

enum DATE_FORMAT {
    format1 = "YYYY-MM-DD HH:mm:ss",
    format2 = "YYYY-MM-DD",
    format3 = "MMM DD, YYYY",
    format4 = "h:mm A",
    format5 = "dddd",
};

export { SERVER_TYPE, DATE_FORMAT, GENDER };
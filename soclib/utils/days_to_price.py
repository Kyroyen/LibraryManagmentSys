
RENT_RATE_PER_DAY = 10

def days_to_price(days: int):
    return max(days*RENT_RATE_PER_DAY, 30)
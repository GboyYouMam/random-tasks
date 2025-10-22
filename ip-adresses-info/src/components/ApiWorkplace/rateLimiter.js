//token-bucket rate limiter class
class RateLimiter {
    //constructor with max tokens and refill interval in milliseconds
  constructor(maxTokens = 5, refillIntervalMs = 60_000) {
    this.max = maxTokens;
    this.refillIntervalMs = refillIntervalMs;
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  //refill tokens based on pasted time
  _refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    if (elapsed <= 0) return;

    const tokensToAdd = (elapsed / this.refillIntervalMs) * this.max;
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.max, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  //try to remove tokens, return true if successful
  tryRemoveToken(count = 1) {
    this._refill();
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }

  //get remaining tokens
  getRemaining() {
    this._refill();
    return Math.floor(this.tokens);
  }
}

//singleton
const limiter = new RateLimiter(5, 60_000);
export default limiter;

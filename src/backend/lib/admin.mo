import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import AdminTypes "../types/admin";

module {
  public type SessionMap = Map.Map<Text, Int>;

  // 24-hour expiry in nanoseconds
  public let SESSION_EXPIRY_NS : Int = 86_400_000_000_000;

  // Generate a pseudo-unique token based on current time and a seed
  public func generateToken(seed : Nat) : Text {
    let now = Time.now();
    let part1 = Int.abs(now).toText();
    let part2 = seed.toText();
    "tk_" # part1 # "_" # part2
  };

  func removeExpiredSessions(sessions : SessionMap) {
    let now = Time.now();
    let expiredKeys = sessions.entries()
      .filter(func((_, expiry)) { expiry <= now })
      .map(func((k, _)) { k })
      .toArray();
    for (key in expiredKeys.values()) {
      sessions.remove(key);
    };
  };

  public func login(
    sessions : SessionMap,
    tokenSeed : Nat,
    username : Text,
    password : Text,
    adminUsername : Text,
    adminPasswordHash : Text
  ) : AdminTypes.LoginResult {
    removeExpiredSessions(sessions);
    if (username == adminUsername and password == adminPasswordHash) {
      let token = generateToken(tokenSeed);
      let expiry = Time.now() + SESSION_EXPIRY_NS;
      sessions.add(token, expiry);
      #ok(token)
    } else {
      #err("Invalid username or password")
    }
  };

  public func validateSession(sessions : SessionMap, token : Text) : Bool {
    switch (sessions.get(token)) {
      case null false;
      case (?expiry) {
        Time.now() <= expiry
      };
    }
  };

  public func logout(sessions : SessionMap, token : Text) {
    sessions.remove(token);
  };
};

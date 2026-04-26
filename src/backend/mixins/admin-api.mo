import Map "mo:core/Map";
import AdminLib "../lib/admin";
import AdminTypes "../types/admin";

mixin (
  sessions : Map.Map<Text, Int>,
  adminUsername : Text,
  adminPasswordHash : Text,
  loginCounter : { var value : Nat }
) {
  // Admin: login, returns session token on success
  public shared func adminLogin(username : Text, password : Text) : async AdminTypes.LoginResult {
    loginCounter.value += 1;
    AdminLib.login(sessions, loginCounter.value, username, password, adminUsername, adminPasswordHash)
  };

  // Admin: validate an existing session token
  public query func validateAdminSession(token : Text) : async Bool {
    AdminLib.validateSession(sessions, token)
  };

  // Admin: logout and invalidate token
  public shared func adminLogout(token : Text) : async () {
    AdminLib.logout(sessions, token)
  };
};

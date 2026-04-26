import Common "common";

module {
  public type Timestamp = Common.Timestamp;
  public type Result<T, E> = Common.Result<T, E>;

  public type SessionToken = Text;

  public type LoginResult = Result<SessionToken, Text>;
};

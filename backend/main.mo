import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";

actor {
  // Types
  type Work = {
    id: Nat;
    title: Text;
    imageUrl: Text;
    description: ?Text;
  };

  type ArtistInfo = {
    name: Text;
    bio: Text;
    contactEmail: Text;
  };

  // Stable variables
  stable var works: [Work] = [];
  stable var artistInfo: ArtistInfo = {
    name = "";
    bio = "";
    contactEmail = "";
  };

  // Helper function to generate a new ID
  func generateId(): Nat {
    return works.size();
  };

  // Add a new work to the portfolio
  public func addWork(title: Text, imageUrl: Text, description: ?Text): async Result.Result<Nat, Text> {
    let newWork: Work = {
      id = generateId();
      title = title;
      imageUrl = imageUrl;
      description = description;
    };
    works := Array.append(works, [newWork]);
    #ok(newWork.id)
  };

  // Get all works in the portfolio
  public query func getWorks(): async [Work] {
    works
  };

  // Update artist information
  public func updateArtistInfo(name: Text, bio: Text, contactEmail: Text): async () {
    artistInfo := {
      name = name;
      bio = bio;
      contactEmail = contactEmail;
    };
  };

  // Get artist information
  public query func getArtistInfo(): async ArtistInfo {
    artistInfo
  };
}

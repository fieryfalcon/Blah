import { useQuery } from "@airstack/airstack-react";

const Component = () => {
  const GET_VITALIK_LENS_FARCASTER_ENS = `query MyQuery {
    SocialFollowers(
      input: {
        filter: { identity: { _in: ["lens/@vitalik"] } }
        blockchain: ALL
        limit: 200
      }
    ) {
      Follower {
        followerAddress {
          addresses
          domains {
            name
          }
          socials {
            dappName
            profileName
            profileTokenId
            profileTokenIdHex
            userId
            userAssociatedAddresses
          }
        }
        followerProfileId
        followerTokenId
        followingAddress {
          socials(input: { filter: { dappName: { _eq: lens } } }) {
            profileName
            profileTokenId
            profileTokenIdHex
          }
        }
        followingProfileId
      }
    }
  }`;

  const { data, loading, error } = useQuery(
    GET_VITALIK_LENS_FARCASTER_ENS,
    {},
    { cache: false }
  );
  if (error) {
    return <p>Error</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render your component using the data returned by the query

  console.log(data);
};

export default Component;

//  cd airstack3
//  npm run start

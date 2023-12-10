const express = require("express");
const { fetchQuery } = require("@airstack/node");
const { init } = require("@airstack/node");
const { config } = require("dotenv");
const cors = require("cors");

config();

init(process.env.AIRSTACK_API_KEY);

const app = express();

app.use(cors());
const port = 3001; // or any other available port

const transactionsQuery = `
  query GetTokenTransfers {
    Ethereum: TokenTransfers(
      input: {filter: {_or: [{from: {_eq: "vitalik.eth"}}, {to: {_eq: "vitalik.eth"}}]}, blockchain: ethereum, limit: 5, order: {blockTimestamp: DESC}}
    ) {
      TokenTransfer {
        amount
        formattedAmount
        blockTimestamp
        token {
          symbol
          name
          decimals
        }
        from {
          addresses
        }
        to {
          addresses
        }
        type
      }
    }
      Polygon: TokenTransfers(
      input: {filter: {_or: [{from: {_eq: "vitalik.eth"}}, {to: {_eq: "vitalik.eth"}}]}, blockchain: polygon, limit: 5, order: {blockTimestamp: DESC}}
    ) {
      TokenTransfer {
        amount
        formattedAmount
        blockTimestamp
        token {
          symbol
          name
          decimals
        }
        from {
          addresses
        }
        to {
          addresses
        }
        type
      }
    }
      
  }
`;

const portfolioQuery = `
query MyQuery {
  Ethereum: TokenBalances(
    input: {filter: {owner: {_eq: "vitalik.eth"}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: ethereum, limit: 5}
  ) {
    TokenBalance {
      owner {
        identity
      }
      amount
      tokenAddress
      tokenId
      tokenType
      tokenNfts {
        contentValue {
          image {
            small
          }
        }
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}
`;

const FollowerQuery = `
query MyQuery {
  SocialFollowers(
    input: {
      filter: { identity: { _in: ["vitalik.eth"] } }
      blockchain: ALL
      limit: 5
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
        domains {
          name
        }
      }
      followingProfileId
    }
  }
}
`;

const cryptoQuery = `
query MyQuery {
  Ethereum: TokenBalances(
    input: {filter: {owner: {_eq: "vitalik.eth"}, tokenAddress: {_in: ["0xdAC17F958D2ee523a2206206994597C13D831ec7", "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",  "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4", "0x50327c6c5a14DCaDE707ABad2E27eB517df87AB5", "0x6B175474E89094C44Da98b954EedeAC495271d0F", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"]}}, blockchain: ethereum, limit: 100}
  ) {
    TokenBalance {
      owner {
        identity
      }
      amount
      tokenAddress
      token {
        name
        symbol
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
}
`;

const FollowingQuery = `
query MyQuery {
  SocialFollowings(
    input: {
      filter: { identity: { _in: ["vitalik.eth"] } }
      blockchain: ALL
      limit: 5
    }
  ) {
    Following {
      followingAddress {
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
      followingProfileId
      followerAddress {
        domains {
          name
        }
      }
      followerProfileId
      followerTokenId
    }
  }
}
`;

const timeSince = (timestamp) => {
  const now = new Date();
  const elapsed = now - new Date(timestamp);

  const minutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};

app.get("/followers", async (req, res) => {
  try {
    const { data, error } = await fetchQuery(FollowerQuery);

    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json(data);
      console.log(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/following", async (req, res) => {
  try {
    const { data, error } = await fetchQuery(FollowingQuery);

    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json(data);
      console.log(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/portfoliopartone", async (req, res) => {
  try {
    const { data, error } = await fetchQuery(cryptoQuery);

    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const { data, error } = await fetchQuery(transactionsQuery);
    console.log(data);
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      // Assuming data is returned in a format similar to your initial structure
      const transactions = [];

      const networks = Object.keys(data); // ["Ethereum", "Polygon"]
      networks.forEach((network) => {
        const tokenTransfers = data[network].TokenTransfer;
        tokenTransfers.forEach((transfer) => {
          const transaction = {
            name: network,
            amount: transfer.formattedAmount,
            timestamp: timeSince(transfer.blockTimestamp),
            fromAddress: transfer.from.addresses.join(", "),
            toAddress: transfer.to.addresses.join(", "),
          };
          transactions.push(transaction);
        });
      });

      res.status(200).json(transactions);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/portfolio", async (req, res) => {
  try {
    const { data, error } = await fetchQuery(portfolioQuery);

    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      // Directly pass the data to the frontend
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

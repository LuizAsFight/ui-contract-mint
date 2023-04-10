/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.35.0
  Forc version: 0.35.3
  Fuel-Core version: 0.17.3
*/

import { Interface, Contract } from "fuels";
import type { Provider, Account, AbstractAddress } from "fuels";
import type { TokenContractAbi, TokenContractAbiInterface } from "../TokenContractAbi";

const _abi = {
  "types": [
    {
      "typeId": 0,
      "type": "()",
      "components": [],
      "typeParameters": null
    },
    {
      "typeId": 1,
      "type": "[_; 3]",
      "components": [
        {
          "name": "__array_element",
          "type": 3,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 2,
      "type": "b256",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 3,
      "type": "str[3]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 4,
      "type": "struct Address",
      "components": [
        {
          "name": "value",
          "type": 2,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 5,
      "type": "u64",
      "components": null,
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "amount",
          "type": 5,
          "typeArguments": null
        },
        {
          "name": "address",
          "type": 4,
          "typeArguments": null
        },
        {
          "name": "amount2",
          "type": 5,
          "typeArguments": null
        },
        {
          "name": "city",
          "type": 1,
          "typeArguments": null
        }
      ],
      "name": "mint_to_address",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [],
  "messagesTypes": [],
  "configurables": []
}

export class TokenContractAbi__factory {
  static readonly abi = _abi
  static createInterface(): TokenContractAbiInterface {
    return new Interface(_abi) as unknown as TokenContractAbiInterface
  }
  static connect(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider
  ): TokenContractAbi {
    return new Contract(id, _abi, accountOrProvider) as unknown as TokenContractAbi
  }
}
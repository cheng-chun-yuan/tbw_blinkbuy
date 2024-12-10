/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/blinkbuy.json`.
 */
export type Blinkbuy = {
  "address": "53cF82S7Q4VFiqAfSdbUdKbs5A5oD72efpZ8GUqsZvkX",
  "metadata": {
    "name": "blinkbuy",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addPriceRequirement",
      "discriminator": [
        150,
        215,
        244,
        204,
        10,
        140,
        214,
        195
      ],
      "accounts": [
        {
          "name": "storeOwner",
          "writable": true,
          "signer": true
        },
        {
          "name": "currency"
        },
        {
          "name": "priceRequirement",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  105,
                  99,
                  101,
                  95,
                  114,
                  101,
                  113,
                  117,
                  105,
                  114,
                  101,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "product"
              },
              {
                "kind": "account",
                "path": "product.num_requirement",
                "account": "storeProduct"
              }
            ]
          }
        },
        {
          "name": "store",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "storeOwner"
              }
            ]
          }
        },
        {
          "name": "product",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101,
                  95,
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "product.num_product",
                "account": "storeProduct"
              }
            ]
          }
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "minAmount",
          "type": "u64"
        },
        {
          "name": "maxAmount",
          "type": "u64"
        },
        {
          "name": "price",
          "type": "u64"
        },
        {
          "name": "initFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addProduct",
      "discriminator": [
        0,
        219,
        137,
        36,
        105,
        180,
        164,
        93
      ],
      "accounts": [
        {
          "name": "storeOwner",
          "writable": true,
          "signer": true,
          "relations": [
            "store"
          ]
        },
        {
          "name": "mintNft",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "product"
              }
            ]
          }
        },
        {
          "name": "store",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "storeOwner"
              }
            ]
          }
        },
        {
          "name": "product",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101,
                  95,
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "store.num_product",
                "account": "storeCertificate"
              }
            ]
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "totalIssuedAmount",
          "type": "u64"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "approveGroupManager",
      "discriminator": [
        55,
        35,
        32,
        188,
        224,
        159,
        102,
        103
      ],
      "accounts": [
        {
          "name": "storeOwner",
          "writable": true,
          "signer": true,
          "relations": [
            "store"
          ]
        },
        {
          "name": "manager",
          "writable": true
        },
        {
          "name": "store",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "storeOwner"
              }
            ]
          }
        },
        {
          "name": "groupManagerCertificate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "manager"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "buyProduct",
      "discriminator": [
        234,
        192,
        237,
        192,
        174,
        7,
        53,
        136
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "currency",
          "relations": [
            "groupOrder"
          ]
        },
        {
          "name": "groupOrder",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "group_order.manager",
                "account": "groupOrder"
              },
              {
                "kind": "account",
                "path": "group_order.num_order",
                "account": "groupOrder"
              }
            ]
          }
        },
        {
          "name": "buyerAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "buyer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "currency"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "vaultGroupOrder",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "groupOrder"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "currency"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "groupRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "groupOrder"
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "cancelRequest",
      "discriminator": [
        65,
        196,
        177,
        247,
        83,
        151,
        33,
        130
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true,
          "relations": [
            "groupRequest"
          ]
        },
        {
          "name": "manager",
          "writable": true
        },
        {
          "name": "currency",
          "relations": [
            "groupOrder"
          ]
        },
        {
          "name": "groupOrder",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "manager"
              },
              {
                "kind": "account",
                "path": "group_order.num_order",
                "account": "groupOrder"
              }
            ]
          },
          "relations": [
            "groupRequest"
          ]
        },
        {
          "name": "buyerAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "buyer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "currency"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "vaultGroupOrder",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "groupOrder"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "currency"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "groupRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "groupOrder"
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "claimProduct",
      "discriminator": [
        215,
        69,
        24,
        52,
        94,
        6,
        15,
        126
      ],
      "accounts": [
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "manager",
          "writable": true
        },
        {
          "name": "storeOwner",
          "writable": true
        },
        {
          "name": "mintNft",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "product"
              }
            ]
          }
        },
        {
          "name": "store",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "storeOwner"
              }
            ]
          }
        },
        {
          "name": "buyerAtaNft",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "buyer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mintNft"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "product",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101,
                  95,
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "product.num_product",
                "account": "storeProduct"
              }
            ]
          }
        },
        {
          "name": "groupOrder",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "manager"
              },
              {
                "kind": "account",
                "path": "group_order.num_order",
                "account": "groupOrder"
              }
            ]
          }
        },
        {
          "name": "groupRequest",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112,
                  95,
                  114,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "groupOrder"
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "membershipCard",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  109,
                  98,
                  101,
                  114,
                  115,
                  104,
                  105,
                  112
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createGroupOrder",
      "discriminator": [
        18,
        29,
        204,
        76,
        163,
        149,
        165,
        44
      ],
      "accounts": [
        {
          "name": "manager",
          "writable": true,
          "signer": true,
          "relations": [
            "groupManagerCertificate"
          ]
        },
        {
          "name": "storeOwner",
          "writable": true
        },
        {
          "name": "product",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101,
                  95,
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "product.num_product",
                "account": "storeProduct"
              }
            ]
          }
        },
        {
          "name": "priceRequirement",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  105,
                  99,
                  101,
                  95,
                  114,
                  101,
                  113,
                  117,
                  105,
                  114,
                  101,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "product"
              },
              {
                "kind": "account",
                "path": "price_requirement.num_requirement",
                "account": "priceRequirement"
              }
            ]
          }
        },
        {
          "name": "store",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "storeOwner"
              }
            ]
          }
        },
        {
          "name": "groupManagerCertificate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "manager"
              }
            ]
          }
        },
        {
          "name": "groupOrder",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  114,
                  111,
                  117,
                  112,
                  95,
                  111,
                  114,
                  100,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "manager"
              },
              {
                "kind": "account",
                "path": "group_manager_certificate.num_order",
                "account": "groupManagerCertificate"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "managerRefund",
          "type": "u64"
        },
        {
          "name": "startTime",
          "type": "u64"
        },
        {
          "name": "numRequirement",
          "type": "u64"
        },
        {
          "name": "expiredTime",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createStore",
      "discriminator": [
        132,
        152,
        9,
        27,
        112,
        19,
        95,
        83
      ],
      "accounts": [
        {
          "name": "storeOwner",
          "writable": true,
          "signer": true
        },
        {
          "name": "store",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "storeOwner"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "requestGroupManager",
      "discriminator": [
        75,
        210,
        146,
        166,
        18,
        81,
        87,
        4
      ],
      "accounts": [
        {
          "name": "manager",
          "writable": true,
          "signer": true
        },
        {
          "name": "storeOwner",
          "writable": true
        },
        {
          "name": "store",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "storeOwner"
              }
            ]
          }
        },
        {
          "name": "groupManagerCertificate",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "manager"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "promoCode",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "updateTotalIssuedAmount",
      "discriminator": [
        84,
        211,
        177,
        207,
        252,
        253,
        98,
        129
      ],
      "accounts": [
        {
          "name": "storeOwner",
          "writable": true,
          "signer": true,
          "relations": [
            "store"
          ]
        },
        {
          "name": "store",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "storeOwner"
              }
            ]
          }
        },
        {
          "name": "product",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  101,
                  95,
                  112,
                  114,
                  111,
                  100,
                  117,
                  99,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "store"
              },
              {
                "kind": "account",
                "path": "product.num_product",
                "account": "storeProduct"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "totalIssuedAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "groupManagerCertificate",
      "discriminator": [
        248,
        11,
        219,
        241,
        96,
        141,
        105,
        119
      ]
    },
    {
      "name": "groupOrder",
      "discriminator": [
        137,
        165,
        65,
        95,
        199,
        50,
        162,
        32
      ]
    },
    {
      "name": "groupRequest",
      "discriminator": [
        122,
        82,
        125,
        33,
        120,
        237,
        65,
        212
      ]
    },
    {
      "name": "membershipCard",
      "discriminator": [
        209,
        226,
        77,
        168,
        172,
        237,
        33,
        125
      ]
    },
    {
      "name": "priceRequirement",
      "discriminator": [
        112,
        21,
        174,
        140,
        157,
        80,
        141,
        27
      ]
    },
    {
      "name": "storeCertificate",
      "discriminator": [
        64,
        232,
        196,
        18,
        110,
        78,
        194,
        143
      ]
    },
    {
      "name": "storeProduct",
      "discriminator": [
        168,
        58,
        237,
        85,
        155,
        121,
        15,
        208
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "customError",
      "msg": "Custom error message"
    },
    {
      "code": 6001,
      "name": "updateAmountError",
      "msg": "Update amount is less than current minimum amount"
    },
    {
      "code": 6002,
      "name": "minLargerThanMaxError",
      "msg": "min value should be lower than max value"
    },
    {
      "code": 6003,
      "name": "timeIsOverError",
      "msg": "the group order is already finished"
    },
    {
      "code": 6004,
      "name": "timeIsNotOverError",
      "msg": "the group order is not finished"
    },
    {
      "code": 6005,
      "name": "notExceedMinError",
      "msg": "Not fulfill the min requirement"
    },
    {
      "code": 6006,
      "name": "exceedMaxError",
      "msg": "Exceed the max requirement"
    },
    {
      "code": 6007,
      "name": "notInitError",
      "msg": "Not initial account error"
    }
  ],
  "types": [
    {
      "name": "groupManagerCertificate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "store",
            "type": "pubkey"
          },
          {
            "name": "promoCode",
            "type": "bytes"
          },
          {
            "name": "manager",
            "type": "pubkey"
          },
          {
            "name": "numOrder",
            "type": "u64"
          },
          {
            "name": "activated",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "groupOrder",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "manager",
            "type": "pubkey"
          },
          {
            "name": "numRequirement",
            "type": "u64"
          },
          {
            "name": "groupManagerCertificate",
            "type": "pubkey"
          },
          {
            "name": "currentAmount",
            "type": "u64"
          },
          {
            "name": "managerRefund",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "u64"
          },
          {
            "name": "expiredTime",
            "type": "u64"
          },
          {
            "name": "minAmount",
            "type": "u64"
          },
          {
            "name": "maxAmount",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": "pubkey"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "numOrder",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "groupRequest",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "groupOrder",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "membershipCard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalSpent",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "lastUpdated",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "priceRequirement",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "productId",
            "type": "pubkey"
          },
          {
            "name": "minAmount",
            "type": "u64"
          },
          {
            "name": "maxAmount",
            "type": "u64"
          },
          {
            "name": "numRequirement",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": "pubkey"
          },
          {
            "name": "initFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "storeCertificate",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "storeOwner",
            "type": "pubkey"
          },
          {
            "name": "numProduct",
            "type": "u64"
          },
          {
            "name": "numManager",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "storeProduct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numProduct",
            "type": "u64"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "mintNft",
            "type": "pubkey"
          },
          {
            "name": "totalIssuedAmount",
            "type": "u64"
          },
          {
            "name": "reservedAmount",
            "type": "u64"
          },
          {
            "name": "soldAmount",
            "type": "u64"
          },
          {
            "name": "numRequirement",
            "type": "u64"
          },
          {
            "name": "mintBump",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "seed",
      "type": "string",
      "value": "\"anchor\""
    }
  ]
};

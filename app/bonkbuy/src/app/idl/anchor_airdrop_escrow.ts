/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/anchor_airdrop_escrow.json`.
 */
export type AnchorAirdropEscrow = {
    "address": "4zNHMENSDayqVbJULYb2Ruw4Fcecw7uVq3s2QCqaoxpB",
    "metadata": {
      "name": "anchorAirdropEscrow",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "claim",
        "discriminator": [
          62,
          198,
          214,
          193,
          213,
          159,
          108,
          210
        ],
        "accounts": [
          {
            "name": "claimer",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint",
            "relations": [
              "escrow"
            ]
          },
          {
            "name": "claimerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "claimer"
                },
                {
                  "kind": "account",
                  "path": "tokenProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
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
            "name": "escrow",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    116,
                    101
                  ]
                },
                {
                  "kind": "account",
                  "path": "escrow.seed",
                  "account": "escrow"
                }
              ]
            }
          },
          {
            "name": "frens",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    114,
                    101,
                    110,
                    115
                  ]
                },
                {
                  "kind": "account",
                  "path": "claimer"
                },
                {
                  "kind": "account",
                  "path": "escrow"
                }
              ]
            }
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "escrow"
                },
                {
                  "kind": "account",
                  "path": "tokenProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
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
        "name": "deposit",
        "discriminator": [
          242,
          35,
          198,
          137,
          82,
          225,
          242,
          182
        ],
        "accounts": [
          {
            "name": "initializer",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint"
          },
          {
            "name": "initializerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "initializer"
                },
                {
                  "kind": "account",
                  "path": "tokenProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
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
            "name": "escrow",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    116,
                    101
                  ]
                },
                {
                  "kind": "account",
                  "path": "escrow.seed",
                  "account": "escrow"
                }
              ]
            }
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "escrow"
                },
                {
                  "kind": "account",
                  "path": "tokenProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
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
            "name": "depositAmount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initialize",
        "discriminator": [
          175,
          175,
          109,
          31,
          13,
          152,
          155,
          237
        ],
        "accounts": [
          {
            "name": "initializer",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint"
          },
          {
            "name": "initializerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "initializer"
                },
                {
                  "kind": "account",
                  "path": "tokenProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
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
            "name": "escrow",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    116,
                    101
                  ]
                },
                {
                  "kind": "arg",
                  "path": "seed"
                }
              ]
            }
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "escrow"
                },
                {
                  "kind": "account",
                  "path": "tokenProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
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
            "name": "seed",
            "type": "u64"
          },
          {
            "name": "oneTimeAmount",
            "type": "u64"
          },
          {
            "name": "maxAmount",
            "type": "u64"
          },
          {
            "name": "depositAmount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "withdraw",
        "discriminator": [
          183,
          18,
          70,
          156,
          148,
          109,
          161,
          34
        ],
        "accounts": [
          {
            "name": "initializer",
            "writable": true,
            "signer": true,
            "relations": [
              "escrow"
            ]
          },
          {
            "name": "mint",
            "relations": [
              "escrow"
            ]
          },
          {
            "name": "initializerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "initializer"
                },
                {
                  "kind": "account",
                  "path": "tokenProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
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
            "name": "escrow",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    115,
                    116,
                    97,
                    116,
                    101
                  ]
                },
                {
                  "kind": "account",
                  "path": "escrow.seed",
                  "account": "escrow"
                }
              ]
            }
          },
          {
            "name": "vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "escrow"
                },
                {
                  "kind": "account",
                  "path": "tokenProgram"
                },
                {
                  "kind": "account",
                  "path": "mint"
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
      }
    ],
    "accounts": [
      {
        "name": "escrow",
        "discriminator": [
          31,
          213,
          123,
          187,
          186,
          22,
          218,
          155
        ]
      },
      {
        "name": "frens",
        "discriminator": [
          118,
          180,
          142,
          153,
          62,
          216,
          69,
          232
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "outOfMaxAmount",
        "msg": "out of max amount"
      },
      {
        "code": 6001,
        "name": "noRemainingAmount",
        "msg": "no remaining amount"
      }
    ],
    "types": [
      {
        "name": "escrow",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "seed",
              "type": "u64"
            },
            {
              "name": "bump",
              "type": "u8"
            },
            {
              "name": "initializer",
              "type": "pubkey"
            },
            {
              "name": "mint",
              "type": "pubkey"
            },
            {
              "name": "oneTimeAmount",
              "type": "u64"
            },
            {
              "name": "maxAmount",
              "type": "u64"
            },
            {
              "name": "depositAmount",
              "type": "u64"
            },
            {
              "name": "remainingAmount",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "frens",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "claimedAmount",
              "type": "u64"
            }
          ]
        }
      }
    ]
  };
  
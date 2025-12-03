export const apiSpec = {
  "openapi": "3.1.0",
  "info": {
    "title": "USDC Payment API",
    "version": "1.0.0",
    "description": "Payment Gateway API for USDC Cryptocurrency"
  },
  "paths": {
    "/api/auth/signup": {
      "post": {
        "operationId": "authentication_api_signup",
        "summary": "Signup",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountSchema"
                }
              }
            }
          }
        },
        "description": "# Signup Endpoint\n\n> This endpoint registers new users",
        "tags": [
          "Authentication"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SignupSchema"
              }
            }
          },
          "required": true
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "operationId": "authentication_api_login",
        "summary": "Login",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "description": "# Login Endpoint\n\n> This endpoint authenticates users",
        "tags": [
          "Authentication"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginSchema"
              }
            }
          },
          "required": true
        }
      }
    },
    "/api/auth/logout": {
      "get": {
        "operationId": "authentication_api_logout",
        "summary": "Logout",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "description": "# Logout Endpoint\n\n> This endpoint deletes the user's access token",
        "tags": [
          "Authentication"
        ],
        "security": [
          {
            "Auth": []
          }
        ]
      }
    },
    "/api/auth/deleteAccount": {
      "get": {
        "operationId": "authentication_api_deleteAccount",
        "summary": "Delete Account",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "description": "# DeleteAccount Endpoint\n\n> This endpoint deletes the user's account",
        "tags": [
          "Authentication"
        ],
        "security": [
          {
            "Auth": []
          }
        ]
      }
    },
    "/api/auth/account": {
      "get": {
        "operationId": "authentication_api_getAccount",
        "summary": "Get Account",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ViewAccountSchema"
                }
              }
            }
          }
        },
        "description": "# Account Endpoint\n\n> This endpoint will return the account object associated with the given token",
        "tags": [
          "Authentication"
        ],
        "security": [
          {
            "Auth": []
          }
        ]
      }
    },
    "/api/auth/updateAccount": {
      "post": {
        "operationId": "authentication_api_updateAccount",
        "summary": "Update Account",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ViewAccountSchema"
                }
              }
            }
          }
        },
        "description": "# UpdateAccount Endpoint\n\n> This endpoint updates account details",
        "tags": [
          "Authentication"
        ],
        "requestBody": {
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "title": "FormParams",
                "type": "object",
                "properties": {
                  "email": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "title": "Email"
                  },
                  "merchant_address": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "title": "Merchant Address"
                  },
                  "username": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "title": "Username"
                  },
                  "password": {
                    "anyOf": [
                      {
                        "type": "string"
                      },
                      {
                        "type": "null"
                      }
                    ],
                    "title": "Password"
                  }
                },
                "required": [
                  "merchant_address"
                ]
              }
            }
          },
          "required": true
        },
        "security": [
          {
            "Auth": []
          }
        ]
      }
    },
    "/api/v1/new/invoice": {
      "post": {
        "operationId": "api_v1_api_newInvoice",
        "summary": "Create Invoice",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ViewInvoiceSchema"
                }
              }
            }
          }
        },
        "description": "# New Invoice\n\n> This endpoint will create a new invoice.\n\n\n- **Note**: The **merchant** field is the merchant's username.",
        "tags": [
          "PAYMENT GATEWAY"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewInvoiceSchema"
              }
            }
          },
          "required": true
        },
        "security": [
          {
            "Auth": []
          }
        ]
      }
    },
    "/api/v1/view/invoice": {
      "get": {
        "operationId": "api_v1_api_viewInvoice",
        "summary": "View Invoice",
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "schema": {
              "title": "Id",
              "type": "integer"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ViewInvoiceSchema"
                }
              }
            }
          }
        },
        "description": "# View Invoice\n\n> This endpoint will return the invoice with the given id.",
        "tags": [
          "PAYMENT GATEWAY"
        ]
      }
    },
    "/api/v1/view/invoices": {
      "get": {
        "operationId": "api_v1_api_viewInvoices",
        "summary": "View Invoices",
        "parameters": [
          {
            "in": "query",
            "name": "skip",
            "schema": {
              "default": 0,
              "title": "Skip",
              "type": "integer"
            },
            "required": false
          },
          {
            "in": "query",
            "name": "limit",
            "schema": {
              "default": 100,
              "title": "Limit",
              "type": "integer"
            },
            "required": false
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "items": {
                    "$ref": "#/components/schemas/ViewInvoiceSchema"
                  },
                  "title": "Response",
                  "type": "array"
                }
              }
            }
          }
        },
        "description": "# View Invoices\n\n> This endpoint will return all invoices belonging to this merchant.",
        "tags": [
          "PAYMENT GATEWAY"
        ],
        "security": [
          {
            "Auth": []
          }
        ]
      }
    },
    "/api/v1/view/stats": {
      "get": {
        "operationId": "api_v1_api_viewStats",
        "summary": "View Stats",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/StatsSchema"
                }
              }
            }
          }
        },
        "description": "# View Stats\n\n> This endpoint will return all the stats necessary for the dashboard (invoices, revenue, completed, pending)",
        "tags": [
          "PAYMENT GATEWAY"
        ],
        "security": [
          {
            "Auth": []
          }
        ]
      }
    },
    "/api/v1/pay/invoice": {
      "post": {
        "operationId": "api_v1_api_payInvoice",
        "summary": "Pay Invoice",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ViewInvoiceSchema"
                }
              }
            }
          }
        },
        "description": "# Pay Invoice\n\n> This endpoint will update the invoice.",
        "tags": [
          "PAYMENT GATEWAY"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentSchema"
              }
            }
          },
          "required": true
        }
      }
    },
    "/api/v1/verify": {
      "get": {
        "operationId": "api_v1_api_verify_payment",
        "summary": "Verify Payment",
        "parameters": [
          {
            "in": "query",
            "name": "invoice_id",
            "schema": {
              "title": "Invoice Id",
              "type": "integer"
            },
            "required": true
          },
          {
            "in": "query",
            "name": "tx_hash",
            "schema": {
              "title": "Tx Hash",
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "description": "# Verify Payment Endpoint\n\n> This endpoint must be called after the user completes a USDC transaction using MetaMask on the frontend\n\nOnce the user sends USDC directly from their wallet to the merchant's wallet address, call this endpoint with the transaction hash to verify and confirm the payment on-chain. The API will check the blockchain to ensure the transaction is valid and matches the invoice amount.",
        "tags": [
          "PAYMENT GATEWAY"
        ]
      }
    }
  },
  "components": {
    "schemas": {
      "AccountSchema": {
        "properties": {
          "id": {
            "format": "uuid4",
            "title": "Id",
            "type": "string"
          },
          "email": {
            "title": "Email",
            "type": "string"
          },
          "username": {
            "title": "Username",
            "type": "string"
          },
          "merchant_address": {
            "title": "Merchant Address",
            "type": "string"
          },
          "created_at": {
            "format": "date-time",
            "title": "Created At",
            "type": "string"
          },
          "updated_at": {
            "format": "date-time",
            "title": "Updated At",
            "type": "string"
          }
        },
        "required": [
          "id",
          "email",
          "username",
          "merchant_address",
          "created_at",
          "updated_at"
        ],
        "title": "AccountSchema",
        "type": "object"
      },
      "SignupSchema": {
        "properties": {
          "email": {
            "title": "Email",
            "type": "string"
          },
          "merchant_address": {
            "title": "Merchant Address",
            "type": "string"
          },
          "username": {
            "title": "Username",
            "type": "string"
          },
          "password": {
            "title": "Password",
            "type": "string"
          }
        },
        "required": [
          "email",
          "merchant_address",
          "username",
          "password"
        ],
        "title": "SignupSchema",
        "type": "object"
      },
      "LoginSchema": {
        "properties": {
          "email": {
            "title": "Email",
            "type": "string"
          },
          "password": {
            "title": "Password",
            "type": "string"
          }
        },
        "required": [
          "email",
          "password"
        ],
        "title": "LoginSchema",
        "type": "object"
      },
      "ViewAccountSchema": {
        "properties": {
          "id": {
            "format": "uuid4",
            "title": "Id",
            "type": "string"
          },
          "merchant_address": {
            "title": "Merchant Address",
            "type": "string"
          },
          "email": {
            "title": "Email",
            "type": "string"
          },
          "username": {
            "title": "Username",
            "type": "string"
          },
          "created_at": {
            "format": "date-time",
            "title": "Created At",
            "type": "string"
          },
          "updated_at": {
            "format": "date-time",
            "title": "Updated At",
            "type": "string"
          }
        },
        "required": [
          "id",
          "merchant_address",
          "email",
          "username",
          "created_at",
          "updated_at"
        ],
        "title": "ViewAccountSchema",
        "type": "object"
      },
      "ViewInvoiceSchema": {
        "properties": {
          "id": {
            "title": "Id",
            "type": "integer"
          },
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata"
          },
          "from_address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "From Address"
          },
          "tx_hash": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Tx Hash"
          },
          "merchant": {
            "$ref": "#/components/schemas/ViewAccountSchema"
          },
          "amount": {
            "title": "Amount",
            "type": "number"
          },
          "status": {
            "title": "Status",
            "type": "string"
          },
          "created_at": {
            "format": "date-time",
            "title": "Created At",
            "type": "string"
          },
          "updated_at": {
            "format": "date-time",
            "title": "Updated At",
            "type": "string"
          }
        },
        "required": [
          "id",
          "metadata",
          "from_address",
          "tx_hash",
          "merchant",
          "amount",
          "status",
          "created_at",
          "updated_at"
        ],
        "title": "ViewInvoiceSchema",
        "type": "object"
      },
      "NewInvoiceSchema": {
        "properties": {
          "metadata": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata"
          },
          "amount": {
            "title": "Amount",
            "type": "number"
          }
        },
        "required": [
          "metadata",
          "amount"
        ],
        "title": "NewInvoiceSchema",
        "type": "object"
      },
      "StatsSchema": {
        "properties": {
          "invoices": {
            "title": "Invoices",
            "type": "integer"
          },
          "revenue": {
            "title": "Revenue",
            "type": "number"
          },
          "pending": {
            "title": "Pending",
            "type": "integer"
          },
          "completed": {
            "title": "Completed",
            "type": "integer"
          }
        },
        "required": [
          "invoices",
          "revenue",
          "pending",
          "completed"
        ],
        "title": "StatsSchema",
        "type": "object"
      },
      "PaymentSchema": {
        "properties": {
          "from_address": {
            "title": "From Address",
            "type": "string"
          },
          "tx_hash": {
            "title": "Tx Hash",
            "type": "string"
          },
          "invoice_id": {
            "title": "Invoice Id",
            "type": "integer"
          }
        },
        "required": [
          "from_address",
          "tx_hash",
          "invoice_id"
        ],
        "title": "PaymentSchema",
        "type": "object"
      }
    },
    "securitySchemes": {
      "Auth": {
        "type": "http",
        "scheme": "bearer"
      }
    }
  }
};
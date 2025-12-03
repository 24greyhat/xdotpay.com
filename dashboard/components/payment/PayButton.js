'use client'
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import USDC_ABI from "@/services/config/ERC20.json";
import ROUTER_ABI from "@/services/config/abi.json";
import { API_URL } from "../../config/env";


const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const ROUTER_ADDRESS = "0x273c4e1584A001E2D849Aca43975244422F48224";




export default function PayButton({ invoiceId, amount, merchantWallet, setLoading, loading }) {

  async function payUSDC() {

    setLoading(true);

    if (!window.ethereum) return alert("MetaMask not detected");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
    const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);

    const amountRaw = ethers.parseUnits(amount.toString(), 6);


    // Step 1: approve router
    const approveTx = await usdc.approve(ROUTER_ADDRESS, amountRaw);
    await approveTx.wait();

    // Step 2: pay merchant
    const tx = await router.pay(USDC_ADDRESS, merchantWallet, amountRaw);
    await tx.wait();


    // store tx_hash in localStorage, if the user accidentally reloads before we verify the tx
    localStorage.setItem("tx", JSON.stringify({ "tx_hash": tx.hash, "invoice_id": invoiceId }));


    // Step 3: notify backend
    await fetch(API_URL + `v1/verify?invoice_id=${invoiceId}&tx_hash=${tx.hash}`, {
      method: "GET",
    }).then((res) => {
      if (res.ok)
        localStorage.removeItem("tx");
    });

    setLoading(false);
  }



  // check if there's a local storage item called tx (incase the user reloaded before verification)
  useEffect(() => {
    const tx = localStorage.getItem("tx");

    if (tx) {
      try {

        let t = JSON.parse(tx);

        if (t.invoice_id !== invoiceId)
          return;


        // verify the tx
        fetch(API_URL + `v1/verify?invoice_id=${t.invoice_id}&tx_hash=${t.tx_hash}`, {
          method: "GET",
        }).then((res) => {
          if (res.ok)
            localStorage.removeItem("tx");
        });


      } catch {
        // quite
      };
    }


  }, [invoiceId])


  return (
    <button

      className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={payUSDC}>
      Pay {amount} USDC
    </button>
  );
}


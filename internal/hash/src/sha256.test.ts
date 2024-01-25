import { expect, test } from "vitest";
import { sha256 } from "./sha256";

test("compatibility with resend's keys", async () => {
  expect(sha256("MVgWNsyPmv6VthC9moCNAPwS")).resolves.toEqual(
    "CptSN3vQ0shZLIsdT5c/tlpeFK/qqxY0R/aQNCfKhWs=",
  );
});

test("hashes the string", async () => {
  // These hashes were generate using our old golang based sha256 implementation
  const keysAndHashes = {
    "3ZFeSzZi4bAHLaADiPyJy7BN": "Af0t8Qg3G7oLwGHlkgMYIeloGL2dNBfcLxOLp3IDROY=",
    "3ZG2fq6wALyJywNrL8Ao21FV": "8HrP1yRXT/iMQSdAXuvx1eDvt8wYOAonBBBHLeW59eo=",
    "3ZGgtK9yv8ek3BxfzzbwR34M": "B3G/5O1sq0D5ymQaPBuP01JJ/ZE96rAAz6m/kGSGycg=",
    "3ZGrs4nA2Qcat7ECQaFvc7nx": "dT1xFbf8eiNnVzmavLipielySYHC9+qqIdw0bV1JTH0=",
    "3ZGztph421F62oySLZVVhkHZ": "x7gcNRTrTHZrFp3AI3wroUdyA4Mr/ULnpxeFv2sbV4M=",
    "3ZHN1DGSNye9anQNUdMqppJe": "oipG0GjQixnsPlwkPd7o4QhvkjdFivNCGVbh32l70L4=",
    "3ZHxhRWe6gTMjcdtc7pAFhxH": "rW8Zj80v0n8zOX6Lzw8gBeKLPDVkGLYuABoIttCWtn4=",
    "3ZJ2mYd8QeaxtrvRzV9R9ip5": "lQXGXTLfuJyuOLhq1NKu1xvw5mPDvKt8VVV/2U6pze8=",
    "3ZJZ1YrcjXHBMuBJdS2nBAxq": "1A6avtKkmSD1FC1JCNkh6+hC7jVvuWvmt0treJwbug8=",
    "3ZJqdBEVAdKw6r79Rw8RaXUN": "9QbAJnoeZ7ca+et1D8cUtDi79V8NZwsrYzlEcFFojOw=",
    "3ZJvdobi31Uz8sfQVFdhwhtV": "V+YaQhPtRYnyNDG4XDgzGflC9BIR4SbRDqueP6k90yg=",
    "3ZK7oHJUG1Y1PdPuDcRHoFM4": "0Qs7CgqNdLRkXkVWn6Atck8Z6zYtlGMemGm1LPpjqus=",
    "3ZKVoGXFtDLh1ok8zB2VjkmY": "SZypYT9N06HgApbBcpVw0+tguJ/WKbpP3xtA4EZuMC8=",
    "3ZKfh45FBBEvnMBKRpaiNAJk": "0vkeApSPq1iZ6VzJBMig/Y/gdWxtvtu9qQAnxY8wf8o=",
    "3ZMq8gqEp2fopgqSYBNk1e3J": "R2O3Yr+HrCGpJS3QDTffujpJ+Ed1NjwNKV4tdgzVKug=",
    "3ZNGtqbZV1kbts5RZskCZXZW": "twH+BYUUukfdBkqqoAGxNLGZMpJV9q2gV02XWEFY91k=",
    "3ZNHvujebbtoxtE79qkykqvA": "NwGU+F8Db6ZwtTjuau4ML9vgeStbgKENx75I4gqC7ek=",
    "3ZNS9EE8CoQwJSa2ADZprVAn": "mGYxI5p0SAPmO4i32/scmK28Lp2eZ+BeU4CbW1YMoGE=",
    "3ZNTiKjoe5uJfetcUVsSy9iv": "C5OX3jl/CkwC7WdI6+7wBkujUyr25tA/egbrHfvfccE=",
    "3ZNTqBBvGgSfUan4gnjfKQ7z": "9QEX2BYs8KnSnZR9Cwe/u+s6aGDaHV8thldGOJ+sZ8o=",
    "3ZNnK92Ce1Lsazdu8oxPdXQb": "3K06gihiuzJobuEGACoTxNjUYC3fe0Tnt0c7LaaUgAw=",
    "3ZNr9iFJhD57ataQqsDNDWC3": "GGENkb/Qh9Lrmt0PYV5BNH+amqZCujZiFqaoUhkiX28=",
    "3ZNsjFHHgp3ic1WLC1vuHvQe": "ilwGiSg18OPlLUSllaGE9ISvuXxiNahg3uie3a88iRg=",
    "3ZP6eYqV9sTgffTCyA6ocrtJ": "9nqLG/A8XB9k3LlUNmsrekkpPGmGnilTLkOtXpYrXy8=",
    "3ZPStw9cqGcZMEFdoNa7ByHj": "7EawrRrCgnOEE+OsQXpNTC0w/7sH5ffgeI6UZQM+Jx0=",
    "3ZQWWTR7sE2k6sBRt4W78PpD": "umsoUfEILtODce/ZDNb8zIc/TpKMxP1KMT7sHg7YcCs=",
    "3ZQgCSPGEJEuGL27jEbWhh68": "LKBmkkPFe+W56hqcKORcj+Q+PBofU9cvghDMbhIBZz4=",
    "3ZRje4duYPhbtmL6pXmW3nvi": "fF/C7zmfJJ6DdzR8S6sdoWAJ7DFWdrwlLFPAfQK40nQ=",
    "3ZS8Dw92w8RLKn98p2DPerEH": "KHL95vVhl3ptBj01COOAqNCE6IjPIxR4Sq9GBBagxUg=",
    "3ZSBKYgk6KzQ45RxUsGy6r9e": "Qe7ojO7h2kuq4WrucpQlwQ/1Ase23V6QQ4sTKvNcwIc=",
    "3ZSZKE8z43BPUesHULeyawwq": "HugbcaB+O3kvZHpA1eWwIYWIZH3q9QRdRNZIF2uUMH8=",
    "3ZSi6CkUC4QNqqWpzdyDnQpW": "2YExfJuVySQRykXRSu/Kn0W4lY6mrQ+QNO9JZ9cWaM4=",
    "3ZSra7KqtwrdgmJ5hxXmPLQj": "eJCdqArySdg5f6TuTJvz7Fd0qnpxNgyziiYz23XB/b0=",
    "3ZSuJVGzVNDGzWaWYbaCNgaj": "dSzGwElcbR6sXx6XMcdiUbkfQ3wm64Wxxo54wgnlpks=",
    "3ZTBxqD3xPPg4cSHje8XHawh": "omRNtKH1J7zdfjA3yF4A1/OF1mjj8Y1AjJVfa08TTB4=",
    "3ZTGzRYdtc6WVV5BCsPon8ao": "5Xf42pwHJtC77E6XjGoljxSn5wd+JIPnkE/9ZiP2Y1k=",
    "3ZTixMPMKrCzAXLxEYYTdy8G": "OAT/Wk4yrlyKIeUHg9gkbkBYGTnpKdUc5fKtdePTPME=",
    "3ZUb5Gqdxx6R1eRcJhAt5cpW": "w/VY0PB6+MrULY4i+/1VIUSaBS/nrXIGINFFk+nj5HU=",
    "3ZUqVSVmQLwaJ2CuU1dJDazQ": "yqA1i3+13JlfKETHmU67UHvuyH+cjL1Sz+Wdf0h9e8s=",
    "3ZUxddz9c7JUL2KN1fTFQZxK": "LSExFnllQLu5JE+jqe7AFDDmTFTrix29ohfcK9r8f+c=",
    "3ZUyGsaZQg5x6qd22ADHR8jM": "pqdG/1PPlI6qD2zh1C9p2zzhhnHt1qYcUVEvz8doGdo=",
    "3ZV7d2rPcL5bAwrN6Ge4M8wa": "lVSkDCvvFkUi5NUYGOLJePTkT6GGKBSEBG0U9WBJFoA=",
    "3ZVvrgJUMg41sP5AxKnMZ9eP": "AYO1i3fhxU4n/eSOjTjz5VGNjTol8g/uGcuRKmikriw=",
    "3ZWZ9sAiK3WhxXefxk83raYv": "5ZJh7s89T5kqjZXqK+OrOHPXnlUichefZKUCUK2yzeU=",
    "3ZWdo1EqYkgUJhjw9DVnt2Ux": "zQHNGpqT00e5qd2Fj8b50WEFqkiaqnzQj7TsJhpviz0=",
    "3ZWzMtc2onktoGTmGGiKaseM": "xUpthhgYEGidEeulZRGVLSNsL+AXstWAeZUjumxjM1c=",
    "3ZXk7N4MqzScryq3HUorGVoT": "nu8F1WFr16uiHIT9LBD7DsWDV/4us1b0QXzU3C6iv/w=",
    "3ZXruFjgmgKqHRWV2drSrQEP": "FxsBA1PKC/aW4o84DTfG5yoMCpuRpVm3l3SxndJUFvU=",
    "3ZXzXGe36q16WaudkbwR3fXg": "sbnY9M6Wt9WLAY91AiKiNtmNxyUMXJuqMo0Wm6RHdME=",
    "3ZY3Mc1PQsqnFVUaXrJSa8Bw": "N7RkeoFUGBRoSariGaTlqPvhaiNW3EU+PruCeOoZR/I=",
    "3ZYBwwFDvyNcETEibaSRUHJ7": "LyCodAVPJs1kJBMXw9ID8hqlSR5lvTF+MAeUuknc8+o=",
    "3ZYKpPWPD9JpX4kjsyubW8v4": "ox2eekVbPjw7vzPtvtQgjqQj2BjXm7ieFZ0W8lBrOKA=",
    "3ZZBnzgMBhBMpNKkWJEhrRtq": "8ah2Eh1/a90MXVqbAU0teAeEWRDYB6YXMF1HJZ5QZWw=",
    "3ZZXNksZ4RXnwUAmAn41bZ2z": "dahjrw0sGy6qqCCf8uBpaQXfuGwgUM3UHX2rSI0kjtY=",
    "3ZZYJ6wk7pDbV9tC89PMmuRb": "s8IjhwHukPNb8WoM38FFa3Tdul7S96eqtpP2RyYFecU=",
    "3ZZkwfxa2QcGxnAgEjdhvbG5": "nvIFyQcSRxnx4ANT+cEqyPCtLKRf/IpVMgjyr6m80eU=",
    "3Za1xerUXy95rTMc687i27F8": "DKQB7UrOCvrmsdt90PoJS4rHiY1GYh2W7PtXDNs0AP8=",
    "3ZaKQi84aYnYyZGqtgsb1Ezp": "92DlW36ZrNhS+H2ASo96bfbVlsVimjxRUeSs+J0EapA=",
    "3ZaLMgGSJ9zzwnKnxHhmz4QV": "NzfPoomamca4nVuY1ilu/gvUPwXPo9rMVzMoK8sKfgI=",
    "3ZabUV64TGJnEQphTQwie8qq": "aift2oTfmy/TRZZdXGE6Ysw19MBQQq++DjXk4c/F1JU=",
    "3ZbGmmSZmAVm9hGzkPXEFEms": "XAw6+XVTE4SnSD8QmxyrWBQ5kk2gDp89flg0iAxlBoI=",
    "3ZbKbeM29ZFdGm9ByvdKnZdP": "aHrcW+SLn84GnKNmQTkccy4jZEKb9p6kmLwUyX/XUPk=",
    "3Zc4GbbdTGCWFLDPsPA4NZ5b": "L9dPASAf8T00WccdjHdc94xrdk/DSXZEqd4bWFluDXo=",
    "3Zc7X3PAMUVsYevmHsMoVCQo": "2iagQLE8ecQfUgCuyFQzsFmU74uEANWvDd6MrqQeMEk=",
    "3Zc9YsWmjoNucft5djDEUgi7": "bekCpOeD26nr63BFOEUQQr+83mZ11dhuUtnSpOFVXTo=",
    "3ZcFC7zNWQYaLRN4W8KMkmU6": "5wOszNeA75qvsSwY3LMLLPz5cOueF2+C34G1ON2U6CU=",
    "3Zcjv9de13Vhjz3suRdi4vP8": "H2JBBoO69MHICyo1HI9GxJsnBOGm4ly87H1DetmxTdk=",
    "3ZdEKYyKwaYsjiLATyo4a3dS": "WmNbuqR0hvYfxLTiswIVCQPEN5fkysKvrHe8uMZXpS4=",
    "3ZdPFPKVsmnqNn1Kup4Xx1Md": "mJlmziEK+RsMmioUA6VXPqFOpmBpu2wHrKUB4WKvR/8=",
    "3ZdYWR6P83ScEHRr8H7zNL7F": "dzzin40+Mow0UYsoLYAVEoWytZBCkXuKrly6Lx1yzjM=",
    "3ZeZMhDdezrqQj4qJ8ymR6PC": "tM6BXq6ESMT+yG4jOYIkCAzXX6cQTy+hjkkLAmNlRnA=",
    "3ZepohbaFi9uNBSWRRaRdF9A": "55OD5n4RdW6RuCjBgfiZGKfqfLtw//SGTKXQ44BgFo4=",
    "3Zf6Q3NH2jobAqL8j8K7k4rL": "dtuAiKuhrhJRV8NmWGOjfkzpO+mkNk6lmxS+xMoRDcI=",
    "3ZfAvhmc23rcE3HZjEZDFrLh": "bmo9E+ashFBPkcHbt3mF9Es3ubEOxD52+ot5iPyLFac=",
    "3ZfF1GqgWK1LKEqQnQ49rvzF": "xBCDGpqai8VrB8+TmVwMmtDlec/XnhdGx8nwi3DTb5s=",
    "3ZfeWuEiGgEqn4PykPFj6VLg": "mFqagNzY1npenBSH4Nw9ATaj8OckkrAJCNMgDCOA6No=",
    "3ZgRgpqZBH4k2ovVoN2hevxn": "TW18y9BA1zvRo+3PXp8yC5X5J9EDkDeoOarBm2a4BFA=",
    "3Zgwzd17XhEaVBUm1GtYx2dS": "4eRwFNKiHfdju9reLB6/7rVz2317hACZk3/nsLFgRgI=",
    "3ZhG4Ly6BGGvdswxVia84Dzh": "1jRL6aQ1elO4s6YkhayhokM252I5NdovLgkPM5VWFM0=",
    "3ZhT2dfhxQhbqLbdGrPE24q2": "TessjQo/AYkxKOzrrt0jTpwfL/a9RjoeUGR2a7v1krQ=",
    "3ZiQHfeoXjmfE8yS9tHEJuD5": "/2DEiDBWR1TPPgri2tQY6xKRaA2+tZ1Mo1V8vRoBdRs=",
    "3ZidmMM7JzaYKZiG6WM2FUMc": "uSCj9Z7FHnNuX4SXzF3USI+b7i5aUoRBt5eo3m56Zi8=",
    "3ZihERXAbDBbhcYao5Av2FuT": "n8x0DzTWjAIUOXe8Kk+rblOpGnBQl6auRlzuj5yeP2A=",
    "3ZivV6rEZ9WeKkHj4PWCwmjh": "9PnLK6dInv8cCJdLOiNRj/1HDIziUg7ETIf4CqGhPSg=",
    "3ZixamEfv22xU6tQkR8BvPjd": "xuIaYR3MXH+t26SBsHz55Pkr3qGzdI6iY517sB1fKMw=",
    "3Zj78ZXozBEqNiuvoCUYujVd": "z78vvM+KrdbGBQ/UWTwNocfowWxINZJ4mZaW25jn+lg=",
    "3ZjJ1tHrWNcQWJtBJLRPN7m1": "6NDoAvYnGh4dCKuhhWee0p19q1+GPgxHITfERoryIXQ=",
    "3ZjKpTvqbdfkn5gEbR5xNQ4V": "NME/lrUqm0ECGKpCidGQpqJ33gk06xcQdU5KgIp60VY=",
    "3ZjSC8wGXuuohFFdbiaJRfN1": "pBlXj3xfHusvBuBsNau/M7y0shf/yyAykhPmVGrIOw0=",
    "3Zjcq6uRvzfqFxJwV4KCGNHG": "A/Ney8el56c0jV7AD8w3EXi7ejc91fZ1Ce48cfAlJF0=",
    "3Zjw5PTJDhaDDmB6mqKBPeLS": "W+fky1GK6bEdl2Z4n2sJH+o4z5SRk3EYWjtmaTfUTaw=",
    "3Zk9jeZLLCbnjg18bQ6yRNfL": "KHrUaPADsL1DLDevQXJBSJegJ1ubctGyU0E7c5CH3e4=",
    "3ZkSDFm3RL9YB29aespSJUXT": "tJvWM3XkYouCvQBEyuItrxPEdBDDM+j1qcTkAlUDfDk=",
    "3ZkWJ2b9n813EEMfsU9AVZQS": "7k2+up70IaIhw2DqYZ65bswV6wVL6WLtXZGhvuqtLeM=",
    "3ZkwAQosEzE7pj9G42ddFhoj": "oM+ISti7QRqUxP8i6Hxxv5QufKYNqjpZTK7yoJLjyRA=",
    "3Zkwyg7Pgbi4UG2AYyhzJbvQ": "4M2L+6DH6YhMEQrOrq43yRIaQs6Wm52vpfVAY8gPKAM=",
    "3Zm4bZt84WbaAK7M8xwoUL4W": "hWsVhss9mduM6GjVqMtClqJuHsGH1j2QxXLGNI2MKgQ=",
    "3Zm9xJrtvv1SbLxSVv9JC3Yh": "O+n9r4hz2nyG/YB75+yWmCRSdBLhOTkd6rLOWZ9Pdlo=",
    "3ZmXehZeiHqy3p7dY6mw18Dj": "m8Ox2Uc0DsG6PCPkwJ3GYWUSuvailqMyfUAE3xQSDO4=",
    "3ZnJpPhMA2vD1u8HcfGYMV1i": "8HZdjYgurGRXpcbLb7aepGxC54lmAUHvO42demlojlQ=",
  };
  for (const [key, hash] of Object.entries(keysAndHashes)) {
    expect(sha256(key)).resolves.toBe(hash);
  }
});

const SUISCAN_BASE = "https://suiexplorer.com/object/";

export const OBJECTS = {
  GHOST_TOKEN: "0x615326bcb0896338ddefe033771f875a4565f649c8d70395da24318c72ac25de",
  TREASURY: "0x2f78d0479d20590f8e63581feadf4f6a5b97e96340336e7c3e38ff115e117188",
  DAO: "0x0897bcfef2ec956c0633ac9050e169976bfcdfb6bf87981acba0cff585ca36d0",
  STAKE: "0x3ccbdf9ca5a4731b055604297c42b927f1dd28bc85b9fda56b2097c00a7a80a8",
  MULTISIG: "0x94a5681ae72bb4df4df9c5e4428dbd7b0157a1dba9206b7861a8912ac8bf68bc",
  TEAM: "0x94a5681ae72bb4df4df9c5e4428dbd7b0157a1dba9206b7861a8912ac8bf68bc",
  RESERVE: "0xbac7e6ffc1ee5ae648144761d6e601da56e809e8d3da21503209e6adec5e8468",
  REWARDS: "0xbef832a2894e99414972788250b035a78947787679402a05edc728fab0555193",
  NETWORK: "0xc3493233ab753124c7802dc6c7886ecd58c1e1bb2b345798c5eb6579d67f790d",
  DEV: "0xe670626f183f24f9fa74725dd1c8670f047786f363e5c5ea8b33310a6b01ff9f",
  PROTOCOL: "0xf2607222f566d5120265405c5d292b35de78875dbbb459270029316f7062e003",
};

export function getLink(objectId: string) {
  return `${SUISCAN_BASE}${objectId}`;
}

export function getTokenLink() { return getLink(OBJECTS.GHOST_TOKEN); }
export function getTreasuryLink() { return getLink(OBJECTS.TREASURY); }
export function getDaoLink() { return getLink(OBJECTS.DAO); }
export function getStakeLink() { return getLink(OBJECTS.STAKE); }
export function getMultisigLink() { return getLink(OBJECTS.MULTISIG); }
export function getTeamLink() { return getLink(OBJECTS.TEAM); }
export function getReserveLink() { return getLink(OBJECTS.RESERVE); }
export function getRewardsLink() { return getLink(OBJECTS.REWARDS); }
export function getNetworkLink() { return getLink(OBJECTS.NETWORK); }
export function getDevLink() { return getLink(OBJECTS.DEV); }
export function getProtocolLink() { return getLink(OBJECTS.PROTOCOL); }

export function getAllLinks(): Record<string, string> {
  const all: Record<string, string> = {};
  for (const [name, obj] of Object.entries(OBJECTS)) {
    all[name] = getLink(obj);
  }
  return all;
}

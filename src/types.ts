// 'extern' is deprecated in favor of 'roaming' but kept for compatibility purposes
export type AuthType = 'auto' | 'local' | 'extern' | 'roaming' | 'both'


// TODO: although algo "-8" is currently only used optionally by a few security keys, 
// it would not harm to support it for the sake of completeness
export type NumAlgo = -7 | -257
export type NamedAlgo = 'RS256' | 'ES256'


export interface CommonOptions {
  userVerification?: UserVerificationRequirement
  authenticatorType?: AuthType
  timeout?: number
  debug?: boolean
}

// larbeBlobSupport here
export interface AuthenticateOptions extends CommonOptions {
  mediation?: CredentialMediationRequirement
  largeBlobRead?: boolean
  largeBlobWrite?: Blob
}

enum LargeBlobSupport {
  Required = "required",
  Preferred = "preferred",
}

export interface AuthenticationExtensionsLargeBlobInputs {
  support?: LargeBlobSupport;
  read?: boolean;
  write?: BufferSource;
}

export interface CustomAuthenticationExtensionsClientInputs extends AuthenticationExtensionsClientInputs {
  largeBlob?: AuthenticationExtensionsLargeBlobInputs;
}

export interface ExtendedAuthenticatorAssertionResponse extends AuthenticatorAssertionResponse {
  getLargeBlob?: () => Promise<ArrayBuffer | null>;
}

export interface AuthenticationEncoded {
  credentialId: string
  //userHash: string, // unreliable, optional for authenticators
  authenticatorData: string
  clientData: string
  signature: string
  largeBlobData?: string
}

export interface AuthenticationParsed {
  credentialId: string
  //userHash: string, // unreliable, optional for authenticators
  authenticator: AuthenticatorInfo
  client: ClientInfo,
  signature: string
}

// largeBlobSupport here
export interface RegisterOptions extends CommonOptions {
  userHandle?: string
  attestation?: boolean
  discoverable?: ResidentKeyRequirement
  largeBlobSupport?: boolean
}


export interface CredentialKey {
  id: string
  publicKey: string
  algorithm: 'RS256' | 'ES256'
}


export interface RegistrationEncoded {
  username: string
  credential: CredentialKey
  authenticatorData: string
  clientData: string
  attestationData?: string
}

export interface RegistrationParsed {
  username: string
  credential: {
    id: string
    publicKey: string
    algorithm: 'RS256' | 'ES256'
  }
  authenticator: AuthenticatorInfo
  client: ClientInfo
  attestation?: any
}

export interface ClientInfo {
  type: "webauthn.create" | "webauthn.get"
  challenge: string
  origin: string
  crossOrigin: boolean
  tokenBindingId?: {
    id: string
    status: string
  }
  extensions?: any
}

export interface AuthenticatorInfo {
  rpIdHash: string,
  flags: {
    userPresent: boolean
    userVerified: boolean
    backupEligibility: boolean
    backupState: boolean
    attestedData: boolean
    extensionsIncluded: boolean
  }
  counter?: number // MacOS does not return this TODO: check the spec
  aaguid: string
  name: string
}
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';

import { AbpApiDefinitionService } from './services/AbpApiDefinitionService';
import { AbpApplicationConfigurationService } from './services/AbpApplicationConfigurationService';
import { AbpTenantService } from './services/AbpTenantService';
import { AccountService } from './services/AccountService';
import { EmailService } from './services/EmailService';
import { EmailSettingsService } from './services/EmailSettingsService';
import { FeaturesService } from './services/FeaturesService';
import { FileManagerService } from './services/FileManagerService';
import { LoginService } from './services/LoginService';
import { PermissionsService } from './services/PermissionsService';
import { ProfileService } from './services/ProfileService';
import { ReCaptchaService } from './services/ReCaptchaService';
import { RoleService } from './services/RoleService';
import { SmsSendingService } from './services/SmsSendingService';
import { SocialLinkService } from './services/SocialLinkService';
import { TenantService } from './services/TenantService';
import { UserService } from './services/UserService';
import { UserLookupService } from './services/UserLookupService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class AuthClient {

    public readonly abpApiDefinition: AbpApiDefinitionService;
    public readonly abpApplicationConfiguration: AbpApplicationConfigurationService;
    public readonly abpTenant: AbpTenantService;
    public readonly account: AccountService;
    public readonly email: EmailService;
    public readonly emailSettings: EmailSettingsService;
    public readonly features: FeaturesService;
    public readonly fileManager: FileManagerService;
    public readonly login: LoginService;
    public readonly permissions: PermissionsService;
    public readonly profile: ProfileService;
    public readonly reCaptcha: ReCaptchaService;
    public readonly role: RoleService;
    public readonly smsSending: SmsSendingService;
    public readonly socialLink: SocialLinkService;
    public readonly tenant: TenantService;
    public readonly user: UserService;
    public readonly userLookup: UserLookupService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.abpApiDefinition = new AbpApiDefinitionService(this.request);
        this.abpApplicationConfiguration = new AbpApplicationConfigurationService(this.request);
        this.abpTenant = new AbpTenantService(this.request);
        this.account = new AccountService(this.request);
        this.email = new EmailService(this.request);
        this.emailSettings = new EmailSettingsService(this.request);
        this.features = new FeaturesService(this.request);
        this.fileManager = new FileManagerService(this.request);
        this.login = new LoginService(this.request);
        this.permissions = new PermissionsService(this.request);
        this.profile = new ProfileService(this.request);
        this.reCaptcha = new ReCaptchaService(this.request);
        this.role = new RoleService(this.request);
        this.smsSending = new SmsSendingService(this.request);
        this.socialLink = new SocialLinkService(this.request);
        this.tenant = new TenantService(this.request);
        this.user = new UserService(this.request);
        this.userLookup = new UserLookupService(this.request);
    }
}

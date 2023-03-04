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
import { ChannelService } from './services/ChannelService';
import { ChatService } from './services/ChatService';
import { ChatMessageService } from './services/ChatMessageService';
import { ChatRoomService } from './services/ChatRoomService';
import { DefaultImageService } from './services/DefaultImageService';
import { DonateService } from './services/DonateService';
import { EmailService } from './services/EmailService';
import { EmailSettingsService } from './services/EmailSettingsService';
import { FeaturesService } from './services/FeaturesService';
import { FileService } from './services/FileService';
import { ItemService } from './services/ItemService';
import { NganLuongWebhookService } from './services/NganLuongWebhookService';
import { PaymentService } from './services/PaymentService';
import { PermissionsService } from './services/PermissionsService';
import { ProfileService } from './services/ProfileService';
import { ReCaptchaService } from './services/ReCaptchaService';
import { RoleService } from './services/RoleService';
import { SocialLinkService } from './services/SocialLinkService';
import { StreamService } from './services/StreamService';
import { TenantService } from './services/TenantService';
import { UserService } from './services/UserService';
import { UserLookupService } from './services/UserLookupService';
import { WalletService } from './services/WalletService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ApiClient {

    public readonly abpApiDefinition: AbpApiDefinitionService;
    public readonly abpApplicationConfiguration: AbpApplicationConfigurationService;
    public readonly abpTenant: AbpTenantService;
    public readonly account: AccountService;
    public readonly channel: ChannelService;
    public readonly chat: ChatService;
    public readonly chatMessage: ChatMessageService;
    public readonly chatRoom: ChatRoomService;
    public readonly defaultImage: DefaultImageService;
    public readonly donate: DonateService;
    public readonly email: EmailService;
    public readonly emailSettings: EmailSettingsService;
    public readonly features: FeaturesService;
    public readonly file: FileService;
    public readonly item: ItemService;
    public readonly nganLuongWebhook: NganLuongWebhookService;
    public readonly payment: PaymentService;
    public readonly permissions: PermissionsService;
    public readonly profile: ProfileService;
    public readonly reCaptcha: ReCaptchaService;
    public readonly role: RoleService;
    public readonly socialLink: SocialLinkService;
    public readonly stream: StreamService;
    public readonly tenant: TenantService;
    public readonly user: UserService;
    public readonly userLookup: UserLookupService;
    public readonly wallet: WalletService;

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
        this.channel = new ChannelService(this.request);
        this.chat = new ChatService(this.request);
        this.chatMessage = new ChatMessageService(this.request);
        this.chatRoom = new ChatRoomService(this.request);
        this.defaultImage = new DefaultImageService(this.request);
        this.donate = new DonateService(this.request);
        this.email = new EmailService(this.request);
        this.emailSettings = new EmailSettingsService(this.request);
        this.features = new FeaturesService(this.request);
        this.file = new FileService(this.request);
        this.item = new ItemService(this.request);
        this.nganLuongWebhook = new NganLuongWebhookService(this.request);
        this.payment = new PaymentService(this.request);
        this.permissions = new PermissionsService(this.request);
        this.profile = new ProfileService(this.request);
        this.reCaptcha = new ReCaptchaService(this.request);
        this.role = new RoleService(this.request);
        this.socialLink = new SocialLinkService(this.request);
        this.stream = new StreamService(this.request);
        this.tenant = new TenantService(this.request);
        this.user = new UserService(this.request);
        this.userLookup = new UserLookupService(this.request);
        this.wallet = new WalletService(this.request);
    }
}

export default interface RegistryInterface {
    register: (id: string, styles: string, isGlobal: boolean) => void;
    has: (id: string) => boolean;
    clear: (id: string) => void;
}

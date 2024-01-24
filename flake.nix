# good nix template: https://srid.ca/rust-nix

{
    inputs = {
        nixpkgs.url = "nixpkgs";
        rust-overlay.url = "github:oxalica/rust-overlay";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = { self, nixpkgs, rust-overlay, flake-utils }:
        flake-utils.lib.eachDefaultSystem (system:
        let
            overlays = [ (import rust-overlay) ];
            pkgs = import nixpkgs {
                inherit system overlays;
            };
            # pkgs = nixpkgs.legacyPackages.${system};
            
            # The reason for using pkgs.symlinkJoin instead of just pkgs is to consolidate these various Rust-related components into a single symlink. This can be convenient for setting up a development environment or ensuring that specific tools are available in a unified location. It simplifies the management of Rust-related tools and makes it easier to reference them in the rest of the Nix configuration, for example, in the subsequent nativeBuildInputs section of the mkShell environment.
            # rust-toolchain = pkgs.symlinkJoin {
            #     name = "rust-toolchain";
            #     paths = [ pkgs.rustc-wasm32 pkgs.cargo pkgs.cargo-watch pkgs.rust-analyzer pkgs.rustPlatform.rustcSrc ];
            # };

            rust-toolchain = pkgs.rust-bin.selectLatestNightlyWith (toolchain: toolchain.default.override {
                extensions = [ "rust-src" ];
                targets = [ "wasm32-unknown-unknown" ];
            });

            nativeBuildInputs = with pkgs; [
                pkg-config
                rust-toolchain
            ];

            packages = with pkgs; [
                wget
                dbus
                openssl_3
                nodejs_18
                yarn
            ];

            buildInputs = packages;
        in
        rec {
            # `nix develop`
            devShell = pkgs.mkShell {
                inherit buildInputs nativeBuildInputs;
                shellHook = ''
                # For rust-analyzer 'hover' tooltips to work.
                export RUST_SRC_PATH=${rust-toolchain}

                # add ~/.cargo/bin to PATH for crates installed with `cargo install`
                export PATH=$PATH:$HOME/.cargo/bin
                
                '';
            };
        });
}
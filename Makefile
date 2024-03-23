UUID = hide-universal-access@akiirui.github.io
DIST_ARCHIVE = $(UUID).shell-extension.zip

build:
	gnome-extensions pack -f --extra-source=LICENSE

clean:
	rm $(DIST_ARCHIVE)

install: uninstall build
	gnome-extensions install -f $(DIST_ARCHIVE)
	gnome-extensions enable $(UUID) || true
	@echo "You need to restart GNOME Shell to apply changes"

uninstall:
	gnome-extensions uninstall $(UUID) || true

spawn-gnome-shell:
	env MUTTER_DEBUG_DUMMY_MODE_SPECS=1920x1080 \
	 	MUTTER_DEBUG_DUMMY_MONITOR_SCALES=1 \
		dbus-run-session -- gnome-shell --nested --wayland
